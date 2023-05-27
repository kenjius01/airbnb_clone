'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { categories } from '@/constants';

import CategoryBox from '../CategoryBox';
import Container from '../Container';

const Category = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';
  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className='flex flex-row items-center justify-between pt-4 overflow-x-auto'>
        {categories.map(item => (
          <CategoryBox
            key={item.id}
            label={item.label}
            description={item.description}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Category;
