import Container from '@/components/Container';
import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/listings/ListingCard';
import { IListingParams } from '@/types';

import getCurrentUser from './actions/getCurrentUser';
import getListings from './actions/getListings';

export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className='grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map(listing => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            item={listing}
          />
        ))}
      </div>
    </Container>
  );
}
