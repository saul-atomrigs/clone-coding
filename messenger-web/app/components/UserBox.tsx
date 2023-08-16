import { useCallback, useState } from 'react';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Avatar from './Avatar';
import LoadingModal from './modals/LoadingModal';

type UserBoxProps = {
  data: User;
};

export default function UserBox({ data }: UserBoxProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);

    const response = await axios.post('/api/conversations', { userId: data.id });

    router.push(`/conversations/${response.data.id}`);

    setIsLoading(false);
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}

      <div
        onClick={handleClick}
        className='
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        '
      >
        <Avatar user={data} />
        <div className='min-w-0 flex-1'>
          <div className='focus:outline-none'>
            <span className='absolute inset-0' aria-hidden='true' />
            <div className='flex justify-between items-center mb-1'>
              <p className='text-sm font-medium text-gray-900'>{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
