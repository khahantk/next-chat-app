'use client';
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageInput from '@/components/message/message-input';
import MessageList from '@/components/message/message-list';
import { useMessage } from "@/components/message/message-provider";

export default function MessageInterface() {
  const { messages } = useMessage();
  const messageListEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messageListEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])
  
  return (
    <div className="p-4 mt-4 w-full flex flex-col overflow-hidden">
      <ScrollArea className="p-4 h-[70vh]">
        <MessageList />
      </ScrollArea>
      <MessageInput />
      <div ref={ messageListEndRef }></div>
    </div>
  );
}
