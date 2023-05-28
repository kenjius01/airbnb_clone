'use client';

import { IconType } from 'react-icons';

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory = ({
  description,
  icon: Icon,
  label
}: ListingCategoryProps) => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-row items-center gap-4'>
        <Icon size={40} className='text-neutral-600' />
        <div className='flex flex-col'>
          <h3 className='text-lg font-semibold'>{label}</h3>
          <span className='font-light text-neutral-500'>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
