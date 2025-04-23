'use client';

import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Input } from '@/components/ui/input';
import { useMessage } from '@/components/message/message-provider';
import { ChannelMemberWithUser, ChannelWithData } from '@/types';
import { Avatar, AvatarFallback } from '../ui/avatar';

type DisplayChannelProps = {
  channel: ChannelWithData;
  selectChannel: (id: string) => void;
  selectedChannelId: string;
  currentUserId: string;
  partner: ChannelMemberWithUser
};

function DisplayChannel({
  channel,
  selectChannel,
  selectedChannelId,
  partner
}: DisplayChannelProps) {
  return (
    <SidebarMenuItem key={channel.id} >
      <SidebarMenuButton
        asChild
      //  isActive={channel.id === selectedChannelId}
        onClick={() => selectChannel(channel.id)}
        className="bg-white"
      >
        <div
          className="flex justify-between items-center min-h-20 gap-2"
          style={{
            cursor: 'pointer',
            fontWeight: channel.id === selectedChannelId ? 'bold' : 'normal',
          }}
        >
          <div className="flex gap-2">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="text-sm">
                {partner?.user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="text-sm font-medium">
                {partner?.user?.name}{' '}
                <span className="text-xs text-muted-foreground"></span>
              </div>
              <div className="bg-muted/50 ">
                <p className="text-sm whitespace-pre-wrap truncate">
                  {channel.name || channel?.product?.title}
                </p>
              </div>
            </div>
            
          </div>
          <div></div>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function MessageSidebar() {
  const [searchChannel, setSearchChannel] = useState('');
  const {
    channels,
    isLoadingChannels,
    selectChannel,
    selectedChannelId,
    session,
    partnerOfSelectedChannel
  } = useMessage();

  const filteredChannels: ChannelWithData[] = (
    (channels as ChannelWithData[]) || []
  ).filter((channel) =>
    channel.name?.toLowerCase().includes(searchChannel.toLowerCase())
  );

  if (isLoadingChannels) return <p>Loading channels...</p>;

  return (
    <Sidebar className="absolute">
      <SidebarHeader>
        <div className="px-2 pb-2 pt-5">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 bg-white"
              maxLength={30}
              value={searchChannel}
              onChange={(e) => setSearchChannel(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoadingChannels ? (
                <Loader2 />
              ) : (
                filteredChannels.map((channel) => (
                  <SidebarMenuItem key={channel.id}>
                    <SidebarMenuButton asChild>
                      <DisplayChannel
                        channel={channel}
                        selectedChannelId={selectedChannelId}
                        selectChannel={selectChannel}
                        currentUserId={session?.user?.id}
                        partner={partnerOfSelectedChannel}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
