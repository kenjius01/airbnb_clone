'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Listing } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';
import API from '@/constants/api';
import { SafeUser } from '@/types';

interface PropertyClient {
  listings: Listing[];
  currentUser?: SafeUser;
}

const PropertyClient = ({ listings, currentUser }: PropertyClient) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = (id: string) => {
    setDeletingId(id);
    axios
      .delete(`${API.DELETE_LISTINGS}/${id}`)
      .then(() => {
        toast.success('Listings deleted!');
        router.refresh();
      })
      .catch(error => {
        toast.error(error?.message || error?.response?.data?.errr);
      })
      .finally(() => {
        setDeletingId('');
      });
  };

  return (
    <Container>
      <Heading title='Properties' subtitle='List of your properties' />
      <div className='grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            item={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel='Delete property'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertyClient;
