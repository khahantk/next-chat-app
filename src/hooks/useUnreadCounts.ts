import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useUnreadCounts() {
  const { status } = useSession();

  return useQuery({
    queryKey: ["unreadCounts"],
    queryFn: async () => {
      const res = await fetch("/api/channels/unread-counts");
      if (!res.ok) throw new Error("Failed to fetch unread counts");
      const data = await res.json();
      // Return as a map for easy access
      return Object.fromEntries(
        data.unreadCounts.map((item) => [item.channelId, item.unreadCount])
      );
    },
    enabled: status === "authenticated",
    refetchInterval: 5000, // or use socket events
  });
}
