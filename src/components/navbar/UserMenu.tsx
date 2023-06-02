'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import ROUTES from '@/constants/routes';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useRentModal from '@/hooks/useRentModal';
import { SafeUser } from '@/types';

import Avatar from '../Avatar';

import MenuItem from './MenuItem';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setIsOpenMenu(value => !value);
  }, []);

  //* Hanlde login
  const handleLogin = () => {
    return loginModal.onOpen();
  };

  //* Handle sign up
  const handleSignup = () => {
    return registerModal.onOpen();
  };

  const onRent = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  };

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100'
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div
          className='flex flex-row items-center gap-3 p-4 transition border rounded-full cursor-pointer md:py-1 md:px-2 border-neutral-200 hover:shadow-md'
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpenMenu && (
        <div className='absolute rounded-xl border shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push(ROUTES.TRIPS)}
                  label='My trips'
                />
                <MenuItem
                  onClick={() => router.push(ROUTES.FAVORITES)}
                  label='My favourites'
                />
                <MenuItem
                  onClick={() => {
                    router.push(ROUTES.RESERVATIONS);
                  }}
                  label='My reservations'
                />
                <MenuItem
                  onClick={() => router.push(ROUTES.PROPERTIES)}
                  label='My properties'
                />
                <MenuItem onClick={rentModal.onOpen} label='Airbnb my home' />
                <hr />
                <MenuItem onClick={() => signOut()} label='Logout' />
              </>
            ) : (
              <>
                <MenuItem onClick={handleLogin} label='Login' />
                <MenuItem onClick={handleSignup} label='Sign up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
