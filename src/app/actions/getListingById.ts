import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

const getListingById = async (params: IParams) => {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId
      },
      include: {
        user: true
      }
    });
    if (!listing) {
      return null;
    }
    return listing;
  } catch (error) {
    console.log('getListingByid', { error });
  }
};

export default getListingById;
