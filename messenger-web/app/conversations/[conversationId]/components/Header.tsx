'use client';

import { HiChevronLeft } from 'react-icons/hi';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Conversation, User } from '@prisma/client';

import useOtherUser from '@/app/hooks/useOtherUser';
import useActiveList from '@/app/hooks/useActiveList';

import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import ProfileDrawer from './ProfileDrawer';

type HeaderProps = {
  conversation: Conversation & {
    users: User[];
  };
};

/**
 * Render the header component for a conversation
 * 대화창 헤더 컴포넌트입니다
 */
export default function Header({ conversation }: HeaderProps) {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();

  // Check if the other user is active
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  // Generate the status text based on the conversation type and user's activity
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className='
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      '
      >
        <div className='flex gap-3 items-center'>
          {/* back button */}
          <Link
            href='/conversations'
            className='
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          '
          >
            <HiChevronLeft size={32} />
          </Link>
          {/* avatar */}
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className='flex flex-col'>
            {/* conversation name or the other user's name */}
            <div>{conversation.name || otherUser.name}</div>
            {/* status text */}
            <div className='text-sm font-light text-neutral-500'>
              {statusText}
            </div>
          </div>
        </div>
        {/* ellipsis icon */}
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className='
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        '
        />
      </div>
    </>
  );
}
