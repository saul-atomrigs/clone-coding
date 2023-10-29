'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';

import toast from 'react-hot-toast';
import Modal from './Modal';
import Input from '../inputs/Input';
import Button from '../Button';
import Select from '../inputs/Select';

type GroupChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
};

/**
 * Renders a modal for creating a group chat.
 * 단체채팅방 만들기 위한 모달창 컴포넌트
 */
export default function GroupChatModal({
  isOpen,
  onClose,
  users = [],
}: GroupChatModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      await axios.post('/api/conversations', {
        ...data,
        isGroup: true,
      });
      router.refresh();
      onClose();
    } catch (error) {
      toast.error('에러 발생!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2
              className='
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              '
            >
              Create a group chat
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Create a chat with more than 2 people.
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                disabled={isLoading}
                label='Name'
                id='name'
                errors={errors}
                required
                register={register}
              />
              <Select
                disabled={isLoading}
                label='Members'
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue('members', value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button
            disabled={isLoading}
            onClick={onClose}
            type='button'
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type='submit'>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
