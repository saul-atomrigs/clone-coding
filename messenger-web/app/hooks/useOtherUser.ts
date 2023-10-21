import { FullConversationType } from '@/app/types';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

/**
 * This function returns the other user in a conversation, given the conversation object and the current session.
 * If the conversation object is of type FullConversationType, it will directly extract the users array.
 * If the conversation object does not have the users array, it will assume that the conversation object itself is the users array.
 * 
 * @param conversation - The conversation object or the object containing the users array.
 * @returns The other user in the conversation.
 */
export default function useOtherUser(conversation: FullConversationType | { users: User[] }) {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    // Filter out the current user from the users array
    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

    return otherUser[0];
  }, [conversation.users, session.data?.user?.email]);

  return otherUser;
}
