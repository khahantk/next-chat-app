'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const ProductChat = ({ product }: { product: Product }) => {
  const [channelId, setChannelId] = useState('');
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname()
  const handleMessageButton = async () => {
    if (!session?.data?.user?.id) {
      router.push(`/signin?ret=${pathname}`);
    }
    const res = await fetch(`/api/channels/${product.id}/`);
    const data = await res.json();
    setChannelId(data.id);
  }

  useEffect(() => {
    if (channelId) {
      router.push(`/messages?channelId=${channelId}`);
    }
  }, [channelId])

  return (
    <div>
      <Button onClick={() => handleMessageButton()} size="lg">
        Chat
      </Button>
     
    </div>
  );
};

export default ProductChat;
