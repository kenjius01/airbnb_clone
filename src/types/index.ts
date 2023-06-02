import { Listing, Reservation, User } from '@prisma/client';

export type SafeUser = Omit<User, 'hashedPassword'>;
export type SafeReservation = Reservation & { listing: Listing };

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: [number, number];
  region: string;
  value: string;
};

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
