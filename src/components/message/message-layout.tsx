'use client';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import MessageSidebar from '@/components/message/message-sidebar';

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MessageSidebar/>
      <div className="flex w-full flex-col">
        <SidebarTrigger />
        <div className="flex w-full ">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
