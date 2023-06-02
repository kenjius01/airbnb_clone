import React from 'react';

import EmptyState from '@/components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';

import PropertyClient from './PropertyClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState title="No trips found' subtitle='Looked like you haven't reserved any trips." />
    );
  }

  return <PropertyClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
