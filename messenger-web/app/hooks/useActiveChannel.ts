import { useEffect, useState } from 'react';
import { pusherClient } from '../libs/pusher';
import { Channel, Members } from 'pusher-js';
import useActiveList from './useActiveList';

/**
 * A custom hook that manages the active channel state
 * and handles the subscription to the Pusher presence channel.
 *
 * 활성 상태의 채널, Pusher presense subscription을 관리합니다
 */
const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    // Initialize the channel if it is not already set
    let channel = activeChannel;
    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger');
      setActiveChannel(channel);
    }

    // Handle successful subscription
    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = [];
      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      set(initialMembers);
    });

    // Handle member added event
    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      add(member.id);
    });

    // Handle member removed event
    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      remove(member.id);
    });

    // Cleanup function to unsubscribe from the channel
    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-messenger');
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
};

export default useActiveChannel;
