import { useParams } from 'next/navigation';
import { useMemo } from 'react';

/**
 * Returns the conversation ID and whether there is an active conversation or not.
 * @returns An object with the isOpen flag and the conversationId.
 */
export default function useConversation() {
  const params = useParams();

  // Check if there is a conversationId and return it
  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }
    return params.conversationId as string;
  }, [params?.conversationId]);

  // Determine if there is an active conversation based on the conversationId
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  // Return the isOpen flag and the conversationId
  return useMemo(() => ({
    isOpen,
    conversationId,
  }), [isOpen, conversationId]);
}
