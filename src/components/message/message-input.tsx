import { useState } from 'react';
import { useMessage } from '@/components/message/message-provider';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import TypingIndicator from "@/components/message/typing-indicator";

export default function MessageInput() {
  const [msgText, setMsgText] = useState('');
  const { sendMessage, selectedChannelId, emitTyping, emitStopTyping } = useMessage();

  const handleChange = (e) => {
    setMsgText(e.target.value);
    if (msgText?.length > 0) {
      emitTyping();
    } else {
      emitStopTyping();
    }
    
  };
  const handleSend = async () => {
    if (!msgText || msgText.trim().length == 0) return;
    await sendMessage(msgText);
    setMsgText('');
    emitStopTyping();
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
      return;
    }
  };

  if (!selectedChannelId) return null;

  return (
    <div>
      <div className="grid w-full gap-1.5 border-t pt-3">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Type a message..."
            value={msgText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={emitStopTyping}
            className="h-15"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-full bg-primary"
          >
            <Send className="size-5" />
          </Button>
        </div>
      </div>
      <TypingIndicator/>
    </div>
  );
}
