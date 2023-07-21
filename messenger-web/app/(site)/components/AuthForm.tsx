'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { BsGithub, BsGoogle } from 'react-icons/bs';

import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState('LOGIN');
  const [loading, setLoading] = useState(false);
  const sessionStatus = session?.status;

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.push('/conversations');
    }
  }, [sessionStatus, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  /** RHF */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    if (variant === 'REGISTER') {
      try {
        const response = await axios.post('/api/register', data);
        if (response.status !== 200) {
          toast.error('입력 정보가 올바른지 확인해주세요');
        } else {
          toast.success('success');
          router.push('/conversations');
        }
      } catch (error) {
        toast.error('에러 발생!');
      } finally {
        setLoading(false);
      }
    }

    if (variant === 'LOGIN') {
      try {
        await signIn('credentials', {
          ...data,
          redirect: false,
        });
      } catch (error) {
        toast.error('에러 발생!');
      } finally {
        setLoading(false);
      }
    }
  };

  const socialActions = async (action: string) => {
    setLoading(true);
    try {
      await signIn(action, {
        callbackUrl: '/conversations',
      });
    } catch (error) {
      toast.error('에러 발생!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        {/* 이메일, 비밀번호 입력폼 + 버튼 */}
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && <Input disabled={loading} register={register} errors={errors} required id='name' label='Name' />}
          <Input disabled={loading} register={register} errors={errors} required id='email' label='Email address' type='email' />
          <Input disabled={loading} register={register} errors={errors} required id='password' label='Password' type='password' />
          <div>
            <Button>{variant === 'LOGIN' ? 'SignIn' : 'Register'}</Button>
          </div>
        </form>

        <div className='mt-6'>
          {/* OR CONTINUE WITH */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>Or continue with</span>
            </div>
          </div>

          {/* SOCIAL LOGIN BUTTONS */}
          <div className='mt-6 flex gap-2'>
            <AuthSocialButton icon={BsGithub} onClick={() => socialActions('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialActions('google')} />
          </div>
        </div>

        {/* CREATE AN ACCOUNT or LOGIN */}
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>{variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}</div>
          <div className='underline cursor-pointer' onClick={() => {}}>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
}
