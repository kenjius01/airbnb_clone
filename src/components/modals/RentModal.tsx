'use client';

import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { categories } from '@/constants';
import API from '@/constants/api';
import useRentModal from '@/hooks/useRentModal';
import { CountrySelectValue } from '@/types';

import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import CounterInput from '../inputs/CounterInput';
import CountrySelect from '../inputs/CountrySelect';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';

import Modal from './Modal';

enum STEP {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEP.CATEGORY);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
        loading: () => <p className='h-[35vh] rounded-lg'>Loading....</p>
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (
    id: string,
    value: string | number | CountrySelectValue
  ) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  };

  const onBack = () => {
    setStep(prev => (prev > STEP.CATEGORY ? prev - 1 : STEP.CATEGORY));
  };

  const onNext = () => {
    setStep(prev => (prev < STEP.PRICE ? prev + 1 : STEP.PRICE));
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEP.PRICE) {
      return onNext();
    }
    setIsloading(true);
    axios
      .post(API.POST_ADD_LISTING, data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEP.CATEGORY);
        rentModal.onClose();
      })
      .catch((error: Error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEP.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEP.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  //* Conent by step
  let bodyContent = (
    <div className='flex flex-col gap-8 '>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:max-h-[50vh] max-h-[60vh] overflow-y-auto'>
        {categories.map(item => (
          <div key={item.id} className='col-span-1'>
            <CategoryInput
              icon={item.icon}
              description={item.description}
              label={item.label}
              selected={category === item.label}
              onClick={category => setCustomValue('category', category)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEP.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located?'
          subtitle='Help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={value => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEP.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some basics about your place'
          subtitle='What amenities do you have?'
        />
        <CounterInput
          title='Guests'
          subtitle='How many guests do you allow?'
          value={guestCount}
          onChange={value => setCustomValue('guestCount', value)}
        />
        <CounterInput
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={value => setCustomValue('roomCount', value)}
        />{' '}
        <CounterInput
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={value => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === STEP.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your places look like'
        />
        <ImageUpload
          value={imageSrc}
          onChange={value => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === STEP.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best'
        />
        <Input
          id='title'
          disabled={isLoading}
          required
          register={register}
          errors={errors}
          label={'Titled'}
        />
        <hr />
        <Input
          id='description'
          disabled={isLoading}
          required
          register={register}
          errors={errors}
          label={'Description'}
        />
      </div>
    );
  }

  if (step === STEP.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      title='Airbnb your home!'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEP.CATEGORY ? undefined : onBack}
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RentModal;
