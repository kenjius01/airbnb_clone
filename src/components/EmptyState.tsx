'use client';

import { useRouter } from 'next/navigation';

import ROUTES from '@/constants/routes';

import Button from './Button';
import Heading from './Heading';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  showReset,
  subtitle = 'Try changing or removing some of your filters',
  title = 'No exact matches'
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading title={title} subtitle={subtitle} center />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button outline onClick={() => router.push(ROUTES.HOME)}>
            {' '}
            Remove all filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
