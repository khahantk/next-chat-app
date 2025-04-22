import Message from "@/components/message";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Messages'
}

export default function MessagesPage() {
  return (
    <div className="relative">
      <Message/>
    </div>
  );
}