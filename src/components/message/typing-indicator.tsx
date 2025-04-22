import { useMessage } from "@/components/message/message-provider";

export default function TypingIndicator() {
  const { typingUsers = [], selectedChannelId } = useMessage();
  if (!selectedChannelId || typingUsers.length === 0) return null;
  return (
    <div className="text-xs text-muted-foreground py-2">
      {typingUsers.map((typingUser) => typingUser.user).join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
    </div>
  );
}
