'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';
import API from '@/constants/api';
import { SafeReservation, SafeUser } from '@/types';

interface ReservationClientProps {
  currentUser: SafeUser;
  reservations: SafeReservation[];
}

const ReservationClient = ({
  currentUser,
  reservations
}: ReservationClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = (id: string) => {
    setDeletingId(id);
    axios
      .delete(`${API.DELETE_RESERVATION}/${id}`)
      .then(() => {
        toast.success('Reservation cancelled!');
        router.refresh();
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
      })
      .finally(() => {
        setDeletingId('');
      });
  };

  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <div className='grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            item={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservations'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
