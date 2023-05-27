'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';

import Modal from './Modal';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false
    })
      .then(callback => {
        if (callback?.ok) {
          toast.success('Logged in!');
          router.refresh();
          loginModal.onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to tyour account' />
      <Input
        id='email'
        label='Email'
        register={register}
        required
        errors={errors}
        type='email'
      />
      <Input
        id='password'
        label='Password'
        register={register}
        required
        errors={errors}
        type='password'
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button outline icon={FcGoogle} onClick={() => signIn('google')}>
        Continue with Google
      </Button>
      <Button outline icon={AiFillGithub} onClick={() => signIn('github')}>
        Continue with Github
      </Button>
      <div className='mt-4 font-light text-center text-neutral-500'>
        <div className='flex flex-row justify-center gap-2'>
          <div>First time using Airbnb?</div>
          <span
            className='cursor-pointer text-neutral-800 hover:underline'
            onClick={toggle}
          >
            Create an account
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      body={bodyContent}
      footer={footerContent}
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModal;
