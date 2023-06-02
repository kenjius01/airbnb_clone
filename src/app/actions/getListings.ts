import prisma from '@/app/libs/prismadb';
import { IListingParams } from '@/types';

const getListings = async (params: IListingParams) => {
  try {
    const {
      userId,
      bathroomCount,
      category,
      endDate,
      guestCount,
      locationValue,
      roomCount,
      startDate
    } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      };
    }

    if (category) {
      query.category = category;
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              { endDate: { gte: startDate }, startDate: { lte: startDate } },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      };
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
