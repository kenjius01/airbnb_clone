'use client';

import { useMemo } from 'react';
import { Listing } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ROUTES from '@/constants/routes';
import useCountry from '@/hooks/useCountry';
import { SafeReservation, SafeUser } from '@/types';

import Button from '../Button';
import HeartButton from '../HeartButton';

interface ListingCardProps {
  item: Listing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard = ({
  item,
  actionId = '',
  actionLabel,
  currentUser,
  disabled,
  onAction,
  reservation
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountry();
  const location = getByValue(item.locationValue);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    onAction?.(actionId);
  };

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return item.price;
  }, [item.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(endDate, 'PP')}`;
  }, [reservation]);

  return (
    <div
      className='col-span-1 cursor-pointer group'
      onClick={() => router.push(`${ROUTES.LISTING}/${item.id}`)}
    >
      <div className='flex flex-col w-full gap-2'>
        <div className='relative w-full overflow-hidden aspect-square rounded-xl'>
          <Image
            fill
            alt='listing image'
            src={item.imageSrc}
            className='object-cover w-full h-full transition group-hover:scale-110'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton listingId={item.id} currentUser={currentUser} />
          </div>
        </div>
        <div className='text-lg font-semibold'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light to-neutral-500'>
          {reservationDate || item.category}
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>${price}</div>
          {!reservation && <div className='font-light'>a night</div>}
        </div>
        {onAction && actionLabel && (
          <Button disabled={disabled} small onClick={handleCancel}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
