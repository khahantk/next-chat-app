'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';

import { Input } from '@/components/ui/input';
import { useMessage } from '@/components/message/message-provider';
import { ChannelWithData } from '@/types';
import ChannelList from './channel-list';

export default function MessageSidebar() {
  const [searchChannel, setSearchChannel] = useState('');
  const { channels, isLoadingChannels } = useMessage();

  const filteredChannels: ChannelWithData[] = (
    (channels as ChannelWithData[]) || []
  ).filter((channel) =>
    channel.name?.toLowerCase().includes(searchChannel.toLowerCase())
  );

  return (
    <Sidebar className="absolute bg-orange-500">
      <SidebarHeader className="bg-white">
        <div className="text-xl lg:text-2xl font-normal pt-2 px-3">Messages</div>
        {channels && channels.length > 0 ? (
          <div className="px-3 pb-2 pt-5">
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
        ) : (
        <div>
            <div className="text-sm text-muted-foreground border-t border-b py-4 px-3 bg-gray-100/60">
              New messages can be initiated from book pages, seller bookstores, as well as your recent purchases or sales.
            </div>
        </div>
        )
        }
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup className=" h-full">
          <SidebarGroupContent className="px-3">
            <SidebarMenu className="gap-4">
              <ChannelList
                isLoadingChannels={isLoadingChannels}
                channels={filteredChannels}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
