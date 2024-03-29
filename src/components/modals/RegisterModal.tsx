'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';

import API from '@/constants/api';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';

import Modal from './Modal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
    axios
      .post(API.REGISTER, data)
      .then(() => {
        toast.success('Success!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create an account' />
      <Input
        id='email'
        label='Email'
        register={register}
        required
        errors={errors}
        type='email'
      />
      <Input
        id='name'
        label='Name'
        register={register}
        required
        errors={errors}
      />{' '}
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
          <div>Already an account?</div>
          <span
            className='cursor-pointer text-neutral-800 hover:underline'
            onClick={toggle}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      body={bodyContent}
      footer={footerContent}
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
