import { ALL_SAMPLE_MESSAGES } from '@/lib/constants';
import { useMessage } from '@/components/message/message-provider';

const MessageSamples = () => {
  const { sendMessage } = useMessage();
  return (
    <div className="flex gap-2 p-2 flex-nowrap">
      {ALL_SAMPLE_MESSAGES.map((msg) => (
        <button
          key={msg.content}
          onClick={() => sendMessage(msg.content)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm cursor-pointer rounded-full border border-gray-300 shadow-sm transition whitespace-nowrap"
        >
          {msg.content}
        </button>
      ))}
    </div>
  );
};

export default MessageSamples;
