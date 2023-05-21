'use client';

import axios, { AxiosError } from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
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

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose();
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
      <Button
        outline
        icon={FcGoogle}
        onClick={() => {
          console.log('first');
        }}
      >
        Continue with Google
      </Button>
      <Button
        outline
        icon={AiFillGithub}
        onClick={() => {
          console.log('first');
        }}
      >
        Continue with Github
      </Button>
      <div className='mt-4 font-light text-center text-neutral-500'>
        <div className='flex flex-row justify-center gap-2'>
          <div>Already an account?</div>
          <span
            className='cursor-pointer text-neutral-800 hover:underline'
            onClick={registerModal.onClose}
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
