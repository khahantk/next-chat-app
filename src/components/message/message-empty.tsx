import { MessageCircle } from 'lucide-react';

const MessageEmpty = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-full mx-auto lg:pb-40">
      <div className="flex flex-col items-center justify-center">
        <div>
          <MessageCircle className="inline-flex mr-3 size-10" />
        </div>
        <div className="text-2xl font-semibold">Welcome to the Messenger!</div>
        <div>Your message will show up here</div>
      </div>
    </div>
  );
};

export default MessageEmpty;
