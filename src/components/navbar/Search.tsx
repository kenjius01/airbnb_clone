'use client';

import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';

import useCountry from '@/hooks/useCountry';
import useSearchModal from '@/hooks/useSearchModal';

const Search = () => {
  const searchModal = useSearchModal();

  const params = useSearchParams();
  const { getByValue } = useCountry();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = locationValue
    ? getByValue(locationValue)?.label
    : 'Anywhere';

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }
      return `${diff} Days`;
    }
    return 'Any week';
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guests`;
    }
    return 'Add guests';
  }, [guestCount]);

  return (
    <div
      className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
      onClick={() => searchModal.onOpen()}
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='px-6 text-sm font-semibold'>{locationLabel}</div>
        <div className='flex-1 hidden px-6 text-sm font-semibold text-center border-l sm:block'>
          {durationLabel}
        </div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600'>
          <div className='hidden sm:block'>{guestLabel}</div>
          <div className='p-2 text-white rounded-full bg-rose-500'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
