'use client';

import { useRouter } from 'next/navigation';
import LogoWithoutText from '../icons/LogoWithoutText';
import LogoWithText from '../icons/LogoWithText';

const Logo = () => {
  const router = useRouter();
  return (
    <div className='flex items-center'>
      <LogoWithText
        className='hidden cursor-pointer xl:block'
        onClick={() => router.push('/')}
      />
      <LogoWithoutText
        className='hidden cursor-pointer md:block xl:hidden'
        onClick={() => router.push('/')}
      />
    </div>
  );
};

export default Logo;
