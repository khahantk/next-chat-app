import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useMessage } from '@/components/message/message-provider';
import { MessageWithSender } from "@/types";

export default function MessageList() {
  const { messages, isLoadingMessages, selectedChannelId } = useMessage();

  if (!selectedChannelId) return <p>Select a channel</p>;
  if (isLoadingMessages) return <p>Loading messages...</p>;
  
  const displayTime = (sentAt: Date) => {
    return new Date(sentAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return (
    <div>
      {(messages as MessageWithSender[]).map((msg, idx) => (
          <div className="mb-2 flex gap-2"  key={idx}>
            <div>
              <Avatar className="w-9 h-9">
                <AvatarFallback className="text-sm">
                  {msg.sender.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="text-sm font-medium">
                {msg.sender?.name}{' '}
                <span className="text-xs text-muted-foreground">
                  {displayTime(msg.createdAt)}
                </span>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg ">
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
        </div>
      ))}
    </div>
  );
}
