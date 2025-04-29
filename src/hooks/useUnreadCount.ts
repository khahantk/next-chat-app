import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useUnreadCount(channelId: string) {
  const { status } = useSession();

  return useQuery({
    queryKey: ["unreadCount", channelId],
    queryFn: async () => {
      const res = await fetch(`/api/channels/${channelId}/unread-count`);
      if (!res.ok) throw new Error("Failed to fetch unread count");
      const data = await res.json();
      return data.unreadCount;
    },
    enabled: status === "authenticated" && !!channelId,
   // refetchInterval: 5000, // or via socket events for real-time
  });
}
