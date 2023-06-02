'use client';

import { useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';

import useSearchModal from '@/hooks/useSearchModal';
import { CountrySelectValue } from '@/types';

import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import CounterInput from '../inputs/CounterInput';
import CountrySelect from '../inputs/CountrySelect';

import Modal from './Modal';

enum STEP {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

interface IQuery {
  category?: string;
  locationValue?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState<STEP>(STEP.LOCATION);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
        loading: () => <p className='h-[35vh] rounded-lg'>Loading....</p>
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = () => {
    setStep(value => value - 1);
  };

  const onNext = () => {
    setStep(value => value + 1);
  };

  const onSubmit = async () => {
    if (step !== STEP.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: IQuery = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      { url: '/', query: updatedQuery as queryString.StringifiableRecord },
      { skipNull: true }
    );
    setStep(STEP.LOCATION);
    searchModal.onClose();
    router.push(url);
  };

  const actionLabel = useMemo(() => {
    if (step === STEP.INFO) {
      return 'Search';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEP.LOCATION) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you want?'
        subtitle='Find the perfect location'
      />
      <CountrySelect value={location} onChange={value => setLocation(value)} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEP.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <Calendar
          value={dateRange}
          onChange={value => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEP.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='More information' subtitle='Find your perfect place' />
        <CounterInput
          title='Guests'
          subtitle='How many guests are coming?'
          value={guestCount}
          onChange={value => setGuestCount(value)}
        />

        <CounterInput
          title='Rooms'
          subtitle='How many rooms do you need?'
          value={roomCount}
          onChange={setRoomCount}
        />

        <CounterInput
          title='Bathrooms'
          subtitle='How many bathrooms do you need?'
          value={bathroomCount}
          onChange={setBathroomCount}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title='Filters'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEP.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default SearchModal;
