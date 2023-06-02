import { Listing } from '@prisma/client';

import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ListingCard from '@/components/listings/ListingCard';
import { SafeUser } from '@/types';

interface FavoriteClientProps {
  currentUser?: SafeUser;
  listings: Listing[];
}

const FavoriteClient = ({ listings, currentUser }: FavoriteClientProps) => {
  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you have favorited!'
      />
      <div className='grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            item={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
