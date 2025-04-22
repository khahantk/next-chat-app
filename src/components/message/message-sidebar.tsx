'use client';

import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Channel } from '@prisma/client';

import { Input } from '@/components/ui/input';
import { useMessage } from '@/components/message/message-provider';

export default function MessageSidebar() {
  const [searchChannel, setSearchChannel] = useState('');
  const { channels, isLoadingChannels, selectChannel, selectedChannelId } =
    useMessage();
  const filteredChannels: Channel[] = ((channels as Channel[]) || []).filter(
    (channel) =>
      channel.name?.toLowerCase().includes(searchChannel.toLowerCase())
  );

  if (isLoadingChannels) return <p>Loading channels...</p>;

  return (
    <Sidebar className="absolute">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
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
              {isLoadingChannels ? (
                <Loader2 />
              ) : (
                filteredChannels.map((channel) => (
                  <SidebarMenuItem key={channel.id}>
                    <SidebarMenuButton asChild>
                      <span
                        onClick={() => selectChannel(channel.id)}
                        style={{
                          cursor: 'pointer',
                          fontWeight:
                            channel.id === selectedChannelId
                              ? 'bold'
                              : 'normal',
                        }}
                      >
                        {channel.name || channel.id}
                      </span>
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
