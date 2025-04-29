'use client';

import { ChannelWithData } from '@/types';
import ChannelItem from '@/components/message/channel-item';

type ChannelListProps = {
  isLoadingChannels: boolean;
  channels: ChannelWithData[];
};

const ChannelList = ({ isLoadingChannels, channels }: ChannelListProps) => {
  return (
    <>
      {isLoadingChannels ? (
        <div>Loading...</div>
      ) : (
        channels.map((channel) => (
          <ChannelItem channel={channel} key={channel.id} />
        ))
      )}
    </>
  );
};

export default ChannelList;
