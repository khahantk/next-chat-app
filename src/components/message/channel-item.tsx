'use client';

import { ChannelWithData } from '@/types';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useMessage } from "@/components/message/message-provider";

type ChannelItemProps = {
  channel: ChannelWithData;
};

export default function ChannelItem({
  channel,
}: ChannelItemProps) {
  const {
    selectChannel,
    selectedChannelId,
    getPartnerOfChannel,
    unreadCounts
 } = useMessage();
  const count = unreadCounts?.[channel.id];
  const partner = getPartnerOfChannel(channel.id);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={channel.id === selectedChannelId}
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
            <Avatar className="size-10.5">
              <AvatarFallback className="text-sm bg-primary text-white">
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
          <div>
          {count > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">{count}</span>
          )}
          </div>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
