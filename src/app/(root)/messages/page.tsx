import { auth } from "@/auth";
import Message from '@/components/message';
import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Messages',
};

export default async function MessagesPage() {
  const session = await auth();
  if (!session || !session.user?.id) {
    return redirect('/signin?ret=/messages');
  }
  return (
    <div className="relative">
      <Message />
    </div>
  );
}
