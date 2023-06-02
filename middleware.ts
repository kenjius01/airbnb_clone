import ROUTES from '@/constants/routes';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    ROUTES.FAVORITES,
    ROUTES.RESERVATIONS,
    ROUTES.PROPERTIES,
    ROUTES.TRIPS
  ]
};
