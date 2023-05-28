'use client';

import Select from 'react-select';

import useCountry from '@/hooks/useCountry';
import { CountrySelectValue } from '@/types';

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountry();

  return (
    <Select
      placeholder='Anywhere'
      isClearable
      options={getAll()}
      value={value as CountrySelectValue}
      onChange={value => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option: CountrySelectValue) => (
        <div className='flex flex-row items-center gap-3'>
          <span>{option.flag}</span>
          <div>
            {option.label},{' '}
            <span className='ml-1 text-neutral-500'>{option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg'
      }}
      theme={theme => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6'
        }
      })}
    />
  );
};

export default CountrySelect;
