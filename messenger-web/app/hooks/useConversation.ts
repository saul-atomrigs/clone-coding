import { useParams } from 'next/navigation';
import { useMemo } from 'react';

/** 대화가 있는지 없는지(undefined conversationId) 체크하고, conversationId를 반환 */
export default function useConversation() {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  /** conversation id가 있으면 isOpen===true, 없으면 isOpen===false */
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
}
