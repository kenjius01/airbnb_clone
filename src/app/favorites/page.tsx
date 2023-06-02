import React from 'react';

import EmptyState from '@/components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';

import FavoriteClient from './FavoriteClient';

const FavoritePage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!currentUser || listings.length === 0) {
    return (
      <EmptyState
        title='No favorites found!'
        subtitle='Looks like you have no favorite listins'
      />
    );
  }

  return <FavoriteClient listings={listings} currentUser={currentUser} />;
};

export default FavoritePage;
