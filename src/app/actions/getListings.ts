import prisma from '@/app/libs/prismadb';
import { IListingParams } from '@/types';

const getListings = async (params: IListingParams) => {
  try {
    const { userId } = params;
    const query: IListingParams = {};
    if (userId) {
      query.userId = userId;
    }
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });
    return listings;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};

export default getListings;
