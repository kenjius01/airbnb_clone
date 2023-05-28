'use client';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterInputProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const CounterInput = ({
  onChange,
  subtitle,
  title,
  value
}: CounterInputProps) => {
  const onAdd = () => {
    onChange(value + 1);
  };
  const onReduce = () => {
    onChange(value > 0 ? value - 1 : value);
  };
  return (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex flex-col'>
        <div className='font-medium'>{title}</div>
        <div className='font-light text-gray-600'>{subtitle}</div>
      </div>
      <div className='flex flex-row items-center gap-4'>
        <div
          onClick={onReduce}
          className='flex items-center justify-center w-10 h-10 transition border rounded-full cursor-pointer border-neutral-400 text-neutral-600 hover:opacity-80'
        >
          <AiOutlineMinus />
        </div>
        <div className='text-xl font-light text-neutral-600'>{value}</div>
        <div
          onClick={onAdd}
          className='flex items-center justify-center w-10 h-10 transition border rounded-full cursor-pointer border-neutral-400 text-neutral-600 hover:opacity-80'
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default CounterInput;
