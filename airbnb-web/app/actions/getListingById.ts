import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

/**
 *  Finds the listing from its ID, and returns an object with information about the listing
 *  DB에서 특정 에어비엔비 리스팅을 찾아 해당 리스팅의 정보를 포함하는 객체를 반환
 */
export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
