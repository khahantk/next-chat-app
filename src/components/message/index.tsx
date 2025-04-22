'use client';

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();
import MessageLayout from '@/components/message/message-layout';
import { MessageProvider } from '@/components/message/message-provider';
import MessageInterface from '@/components/message/message-interface';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Message />
    </QueryClientProvider>
  )
}
const Message = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MessageProvider>
        <MessageLayout>
          <MessageInterface></MessageInterface>
        </MessageLayout>
      </MessageProvider>
    </QueryClientProvider>
  );
};