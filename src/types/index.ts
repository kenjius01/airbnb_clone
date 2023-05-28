import { User } from '@prisma/client';

export type SafeUser = Omit<User, 'hashedPassword'>;

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: [number, number];
  region: string;
  value: string;
};
