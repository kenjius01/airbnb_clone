'use client';

import Image from 'next/image';

import useCountry from '@/hooks/useCountry';
import { SafeUser } from '@/types';

import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
  id,
  imageSrc,
  locationValue,
  title,
  currentUser
}: ListingHeadProps) => {
  const { getByValue } = useCountry();
  const location = getByValue(locationValue);
  return (
    <div>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image alt='img' src={imageSrc} fill className='object-cover w-full' />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
