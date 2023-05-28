'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorite from '@/hooks/useFavorite';
import { SafeUser } from '@/types';

interface HeartButtonProps {
  listingId: string;
  currentUser: SafeUser | undefined | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });
  return (
    <div
      className='relative transition cursor-pointer hover:opacity-80'
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px]'
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/50'}
      />
    </div>
  );
};

export default HeartButton;
