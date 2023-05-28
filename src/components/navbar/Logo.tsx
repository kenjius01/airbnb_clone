'use client';

import { useRouter } from 'next/navigation';

import ROUTES from '@/constants/routes';

import LogoWithoutText from '../icons/LogoWithoutText';
import LogoWithText from '../icons/LogoWithText';

const Logo = () => {
  const router = useRouter();
  return (
    <div className='flex items-center'>
      <LogoWithText
        className='hidden cursor-pointer xl:block'
        onClick={() => router.push(ROUTES.HOME)}
      />
      <LogoWithoutText
        className='hidden cursor-pointer md:block xl:hidden'
        onClick={() => router.push(ROUTES.HOME)}
      />
    </div>
  );
};

export default Logo;
