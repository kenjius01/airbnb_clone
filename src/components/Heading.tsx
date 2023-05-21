'use client';

interface IHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading = ({ title, center, subtitle }: IHeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <h5 className='mt-2 font-light text-neutral-500'>{subtitle}</h5>
    </div>
  );
};

export default Heading;
