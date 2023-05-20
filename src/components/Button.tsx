'use client';

import { IconType } from 'react-icons';

interface IButtonsProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button = ({ children, onClick, disabled = false, icon: Icon, outline, small = false }: IButtonsProps) => {
  return (
    <button
      className={`relative
                w-full
                transition
                rounded-lg
                disabled:opacity-70 
                disabled:cursor-not-allowed
                hover:opacity-80
             ${outline ? 'bg-white border-black text-black' : 'bg-rose-500 border-rose-500 text-white'}
             ${small ? 'py-1 text-sm font-light border' : 'py-3 text-base font-semibold border-2'}

            `}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={small ? 20 : 24} className='absolute left-4 top-3' />}
      {children}
    </button>
  );
};

export default Button;
