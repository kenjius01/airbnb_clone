'use client';

import { Range } from 'react-date-range';

import Button from '../Button';
import Calendar from '../inputs/Calendar';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDate: Date[];
}

const ListingReservation = ({
  dateRange,
  disabledDate,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
  disabled
}: ListingReservationProps) => {
  return (
    <div className='overflow-hidden bg-white border rounded-xl border-neutral-200'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <span className='text-2xl font-semibold'>$ {price}</span>
        <span className='font-light to-neutral-600'>night</span>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDate={disabledDate}
        onChange={value => onChangeDate(value.selection)}
      />
      <hr />
      <div className='p-4'>
        <Button disabled={disabled} onClick={onSubmit}>
          Reserve
        </Button>
      </div>
      <div className='flex flex-row items-center justify-between p-4 text-lg font-semibold'>
        <span>Total</span>
        <span>$ {totalPrice}</span>
      </div>
    </div>
  );
};

export default ListingReservation;
