'use client';

import { IconType } from 'react-icons';
import { Listing } from '@prisma/client';
import dynamic from 'next/dynamic';

import useCountry from '@/hooks/useCountry';
import { SafeUser } from '@/types';

import Avatar from '../Avatar';

import ListingCategory from './ListingCategory';

const Map = dynamic(() => import('../Map'), {
  ssr: false
});

interface ListingInfoProps {
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  listing: Listing & {
    user: SafeUser;
  };
}

const ListingInfo = ({ category, listing }: ListingInfoProps) => {
  const { getByValue } = useCountry();
  const coordinates = getByValue(listing.locationValue)?.latlng;

  return (
    <div className='flex flex-col col-span-4 gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-center gap-2 text-xl font-semibold'>
          <span>Hosted by {listing.user.name}</span>
          <Avatar src={listing.user.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <span>{listing.guestCount} guests</span>
          <span>{listing.roomCount} rooms</span>
          <span>{listing.bathroomCount} bathrooms</span>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <span className='text-lg font-light text-neutral-500'>
        {listing.description}
      </span>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
