'use client';
import { useEffect, useRef } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import MessageInput from '@/components/message/message-input';
import MessageList from '@/components/message/message-list';
import { useMessage } from '@/components/message/message-provider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import MessageEmpty from '@/components/message/message-empty';
import MessageSamples from '@/components/message/message-samples';
import { ALL_SAMPLE_MESSAGES } from '@/lib/constants';

export default function MessageInterface() {
  const {
    messages,
    getPartnerOfChannel,
    currentSelectedChannel,
    selectedChannelId,
    channels,
  } = useMessage();
  const partner = getPartnerOfChannel(selectedChannelId);
  const messageListEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messageListEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  if ((channels || []).length == 0) {
    return <MessageEmpty />;
  }
  return (
    <div className="p-4 pt-1.5 w-full flex flex-col overflow-hidden">
      <div className="border-b mb-2">
        <div className="flex justify-between items-center min-h-15 gap-2">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="text-sm bg-primary text-white">
                  {partner?.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="text-base font-medium">
                  {partner?.user?.name}{' '}
                  <span className="text-xs text-muted-foreground"></span>
                </div>
              </div>
            </div>
            {currentSelectedChannel && (
              <div className="ml-4 lg:block hidden">
                <div className="text-base text-muted-foreground whitespace-pre-wrap py-2">
                  {currentSelectedChannel?.name ||
                    currentSelectedChannel?.product?.title}
                </div>
              </div>
            )}
          </div>
          <div>
            <Button asChild className="font-semibold">
              <Link
                href={`/user/profile/${partner?.user?.id}`}
                className="font-semibold"
              >
                View Profile
              </Link>
            </Button>
          </div>
        </div>
        {currentSelectedChannel && (
          <div className="border-t block lg:hidden">
            <div className="text-base text-muted-foreground whitespace-pre-wrap py-2">
              {currentSelectedChannel?.name ||
                currentSelectedChannel?.product?.title}
            </div>
          </div>
        )}
      </div>
      <ScrollArea className="pt-4 lg:p-4 h-[70vh] bg-blue-50/30">
        <MessageList />
        <div ref={messageListEndRef}></div>
      </ScrollArea>
      {ALL_SAMPLE_MESSAGES.length > 0 && (
        <div className="flex overflow-x-hidden">
          <ScrollArea className="w-1 flex-1">
            <MessageSamples />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
      <MessageInput />
    </div>
  );
}
