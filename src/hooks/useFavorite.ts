import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import API from '@/constants/api';
import { SafeUser } from '@/types';

import useLoginModal from './useLoginModal';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser?.favoriteIds, listingId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;
      if (hasFavorited) {
        request = () =>
          axios.delete(`${API.REMOVE_FROM_FAVORITE}/${listingId}`);
      } else {
        request = () => axios.post(`${API.ADD_TO_FAVORITES}/${listingId}`);
      }
      await request();
      router.refresh();
      toast.success('Success');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
      console.log({ error });
    }
  };

  return {
    hasFavorited,
    toggleFavorite
  };
};

export default useFavorite;
