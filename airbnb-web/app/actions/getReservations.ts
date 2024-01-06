import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

/**
 * Retrieves reservations based on the provided parameters.
 *
 * 파라미터(listingId, userId, authorId)값에 해당하는 모든 예약(reservations) 반환합니다.
 */
export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    // 쿼리 객체 생성
    const query: any = {};

    // 쿼리 객체에 listId, userId, authorId 값을 추가
    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    // 위 쿼리 객체를 이용하여 예약(reservations)를 가져옵니다
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 타입 세이프한 예약 객체로 변환
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
