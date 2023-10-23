'use client';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from 'clsx';
import { find, uniq } from 'lodash';

import useConversation from '@/app/hooks/useConversation';
import { pusherClient } from '@/app/libs/pusher';
import GroupChatModal from '@/app/components/modals/GroupChatModal';
import ConversationBox from '@/app/conversations/components/ConversationBox';
import { FullConversationType } from '@/app/types';

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

/**
 * Renders a list of conversations with a sidebar and a modal.
 * 채팅방(ConversationBox) 목록을 렌더링합니다. 사이드바(Sidebar)와 모달창(GroupChatModal)을 포함합니다.
 */
export default function ConversationList({
  initialItems,
  users,
}: ConversationListProps) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();
  const { conversationId, isOpen } = useConversation();

  /* Use user's email as the pusher key */
  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:remove', removeHandler);
  }, [pusherKey, router]);

  return (
    <>
      {/* 모달창: */}
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* GroupChatModal이 없을때만: */}
      <aside
        className={clsx(
          `
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        {/* 'Messages'를 클릭하면 GroupChatModal이 열린다: */}
        <div className='px-5'>
          <div className='flex justify-between mb-4 pt-4'>
            <div className='text-2xl font-bold text-neutral-800'>Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className='
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              '
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>

          {/* 대화 상자들 */}
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
}
