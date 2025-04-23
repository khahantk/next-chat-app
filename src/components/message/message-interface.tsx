'use client';
import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageInput from '@/components/message/message-input';
import MessageList from '@/components/message/message-list';
import { useMessage } from '@/components/message/message-provider';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function MessageInterface() {
  const {
    messages,
    partnerOfSelectedChannel: partner,
    currentSelectedChannel,
  } = useMessage();
  const messageListEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messageListEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="p-4 w-full flex flex-col overflow-hidden">
      <div className="border-b mb-2">
        <div className="flex justify-between items-center min-h-15 gap-2">
          <div className="flex gap-2">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="text-sm">
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
          <div>
            <Button variant="outline" asChild>
              <Link href="/user/profile/">View Profile</Link>
            </Button>
          </div>
        </div>
        {currentSelectedChannel && (
          <div className="border-t">
              <div className="text-base whitespace-pre-wrap py-2">
                {currentSelectedChannel?.name ||
                  currentSelectedChannel?.product?.title}
              </div>
          </div>
        )}
      </div>
      <ScrollArea className="p-4 h-[70vh]">
        <MessageList />
        <div ref={messageListEndRef}></div>
      </ScrollArea>
      <MessageInput />
    </div>
  );
}
