'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useSearchParams } from "next/navigation";
import { io } from 'socket.io-client';
import debounce from "lodash.debounce";
import { ChannelWithData, MessageWithSender } from "@/types";


const MessageContext = createContext(null);
let socket: ReturnType<typeof io>;;
export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams()
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null
  );
  const [typingUsers, setTypingUsers] = useState([]);

  const markChannelAsRead = async (channelId: string) => {
    await fetch(`/api/channels/${channelId}/read`, { method: "POST" });
    socket.emit("read", { channelId, userId: session?.user?.id });
    queryClient.invalidateQueries(["unreadCounts"]);

  };

  const {
    data: unreadCounts = {},
    refetch: refetchUnreadCounts,
  } = useQuery({
    queryKey: ["unreadCounts"],
    queryFn: async () => {
      const res = await fetch("/api/channels/unread-counts");
      if (!res.ok) throw new Error("Failed to fetch unread counts");
      const data = await res.json();
      return Object.fromEntries(data.unreadCounts.map(i => [i.channelId, i.unreadCount]));
    },
    enabled: status === "authenticated",
   // refetchInterval: 5000,
  });

  useEffect(() => {
    if (status === 'authenticated') {
      socket = io({
        path: '/api/socket',
        query: { userId: session?.user?.id, name: session?.user?.name },
      });
      socket.on('connect', () => {
        console.log('Connected to socket server');
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [status]);

  // Fetch channels
  const { data: channels, isLoading: isLoadingChannels } = useQuery({
    queryKey: ['channels'],
    queryFn: async () => {
      const res = await fetch('/api/channels');
      if (!res.ok) throw new Error('Failed to fetch channels');
      return (await res.json()) as ChannelWithData[];
    },
    enabled: status === 'authenticated',
  });

  // Fetch messages for selected channel
  const {
    data: messages,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ['messages', selectedChannelId],
    queryFn: async () => {
      if (!selectedChannelId) return [];
      const res = await fetch(`/api/messages/${selectedChannelId}`);
      if (!res.ok) throw new Error('Failed to fetch messages');
      return await res.json() as MessageWithSender[];
    },
    enabled: !!selectedChannelId,
  });

  // Listen for real-time messages for the selected channel
  useEffect(() => {
    if (!socket || !selectedChannelId) return;

    const messageHandler = (message: MessageWithSender) => {
      console.log(`Receiving message: `, message)
      
      if (message.channelId === selectedChannelId) {
        queryClient.setQueryData(
          ['messages', selectedChannelId],
          (old = []) => [...old, message]
        );
      }
      queryClient.invalidateQueries(["unreadCounts"]);
    };
    const typingHandler = ({ user, userId }: {user: string, userId: string}) => {
      if (userId === session?.user?.id) {
        return;
      }
      
      setTypingUsers((prev) => {
        const found = prev.find((element) => element.userId);
        if (found) {
          return prev;
        } 
        return [...prev, { user, userId }];
      });
    };

    const stopTypingHandler = ({ userId }: { userId: string}) => {
      setTypingUsers((prev) => prev.filter((u) => u.userId !== userId));
    };

    socket.on("typing", typingHandler);
    socket.on("stopTyping", stopTypingHandler);

    socket.on('receiveMsg', messageHandler);

    // Join channel room
    console.log(`Joining room: ${selectedChannelId}`);
    socket.emit('joinRoom', selectedChannelId);

    return () => {
      // Leave room when unmounting or changing channel
      socket.emit('leaveRoom', selectedChannelId);
      socket.off('receiveMsg', messageHandler);
      socket.off("typing", typingHandler);
      socket.off("stopTyping", stopTypingHandler);
      // socket.disconnect();
    };
  }, [selectedChannelId, queryClient, socket]);

  useEffect(() => {
    const channelId = searchParams?.get('channelId');
    if (channelId) {
      setSelectedChannelId(channelId);
    }
  }, [searchParams])

  useEffect(() => {
    const saved = localStorage.getItem("selectedChannelId");
    if (saved) {
      setSelectedChannelId(saved);
    }
  }, []);
  useEffect(() => {
    if (channels && channels.length > 0 && !selectedChannelId) {
      setSelectedChannelId(channels[0].id)
    }
  }, [ channels, selectedChannelId ]);
  
  useEffect(() => {
    if (selectedChannelId) {
      localStorage.setItem("selectedChannelId", selectedChannelId);
    }
  }, [selectedChannelId]);

  const selectChannel = (id: string) => {
    setSelectedChannelId(id);
    setTypingUsers([]);
    markChannelAsRead(id); 
  };

  const sendMessage = async (content: string) => {
    if (!selectedChannelId || !content) return;
    const res = await fetch(`/api/messages/${selectedChannelId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const newMessage = await res.json();
    console.log('Sending new message: ', { newMessage })
    socket.emit('sendMsg', newMessage);
  };

  const emitTyping = useCallback(
    debounce(() => {
      if (socket && selectedChannelId) {
        socket.emit("typing", { channelId: selectedChannelId, user: session?.user?.name, userId: session?.user?.id });
      }
    }, 300),
    [selectedChannelId, session]
  );

  const emitStopTyping = useCallback(() => {
    if (socket && selectedChannelId) {
      socket.emit("stopTyping", { channelId: selectedChannelId, user: session?.user?.name, userId: session?.user?.id });
    }
  }, [selectedChannelId, session]);

  const currentSelectedChannel: ChannelWithData | undefined = useMemo(() => {
    return channels?.find(channel => channel.id === selectedChannelId)
  }, [channels, selectedChannelId])

  const getPartnerOfChannel = (channelId: string) => {
    const channel: ChannelWithData | undefined = channels?.find(channel => channel.id === channelId)
    return channel?.members?.find((user) => {
      return user.userId !== session?.user?.id;
    });
  } 

  const value = {
    session,
    channels: channels || [],
    isLoadingChannels,
    selectedChannelId,
    selectChannel,
    messages: messages || [],
    isLoadingMessages,
    sendMessage,
    refetchMessages,
    socket,
    emitTyping,
    emitStopTyping,
    getPartnerOfChannel,
    currentSelectedChannel,
    typingUsers: typingUsers || [],
    unreadCounts,
    refetchUnreadCounts
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};
