'use client';
interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <div
      className='px-4 py-3 font-semibold transition hover:bg-neutral-100'
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
