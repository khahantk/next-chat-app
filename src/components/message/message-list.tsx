import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useMessage } from '@/components/message/message-provider';
import { MessageWithSender } from "@/types";
import { displayMsgTime } from "@/lib/utils";

const PartnerMessageBox = ({ msg }: { msg: MessageWithSender} ) => {
  return (
    <div className="mb-2 flex gap-2 max-w-full lg:max-w-[90%]">
        <div>
          <Avatar className="w-9 h-9">
            <AvatarFallback className="text-sm bg-primary text-white">
              {msg.sender?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="text-sm font-medium">
            {msg.sender?.name}{' '}
            <span className="text-xs text-muted-foreground">
              {displayMsgTime(msg.createdAt)}
            </span>
          </div>
          <div className="p-3 bg-muted rounded-t-lg rounded-r-lg lg:pr-18 mt-2">
            <p className="text-sm lg:text-base whitespace-pre-wrap">{msg.content}</p>
          </div>
        </div>
    </div>
  )
}
const MyMessageBox = ({ msg }: { msg: MessageWithSender} ) => {
  return (
    <div className="mb-2 flex gap-2 justify-end max-w-full lg:max-w-[90%]">
        <div>
          <div className="text-sm font-medium text-right">
            <span className="text-xs text-muted-foreground">
              {displayMsgTime(msg.createdAt)}
            </span>
          </div>
          <div className="p-3 bg-primary text-white rounded-t-lg rounded-r-lg lg:pr-18 mt-2">
            <p className="text-sm lg:text-base whitespace-pre-wrap">{msg.content}</p>
          </div>
        </div>
    </div>
  )
}

export default function MessageList() {
  const { messages, isLoadingMessages, selectedChannelId, session } = useMessage();
  if (!selectedChannelId) return <p>Select a channel</p>;
  if (isLoadingMessages) return <p>Loading messages...</p>;
  return (
    <div>
      {(messages as MessageWithSender[]).map((msg: MessageWithSender, idx: number) => {
        return (
          <>
          { msg.sender.id === session?.user?.id ? <MyMessageBox msg={msg} key={idx}/> : <PartnerMessageBox msg={msg} key={idx} /> }
          </>
        )
      })}
    </div>
  );
}
