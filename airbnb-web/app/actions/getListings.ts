import prisma from "@/app/libs/prismadb"

export interface IListingsParams {
 userId?: string
 guestCount?: number
 roomCount?: number
 bathroomCount?: number
 startDate?: string
 endDate?: string
 locationValue?: string
 category?: string
}

/**
 * Retrieves a list of listings based on the provided parameters.
 * 입력되는 파라미터에 해당하는 전체 에어비엔비 리스팅 목록을 반환합니다.
 */
export default async function getListings(params: IListingsParams) {
 try {
  const {
   userId,
   roomCount,
   guestCount,
   bathroomCount,
   locationValue,
   startDate,
   endDate,
   category,
  } = params

  let query: any = {}

  if (userId) {
   query.userId = userId
  }

  if (category) {
   query.category = category
  }

  if (roomCount) {
   query.roomCount = {
    gte: +roomCount,
   }
  }

  if (guestCount) {
   query.guestCount = {
    gte: +guestCount,
   }
  }

  if (bathroomCount) {
   query.bathroomCount = {
    gte: +bathroomCount,
   }
  }

  if (locationValue) {
   query.locationValue = locationValue
  }

  if (startDate && endDate) {
   query.NOT = {
    reservations: {
     some: {
      OR: [
       {
        endDate: { gte: startDate },
        startDate: { lte: startDate },
       },
       {
        startDate: { lte: endDate },
        endDate: { gte: endDate },
       },
      ],
     },
    },
   }
  }

  const listings = await prisma.listing.findMany({
   where: query,
   orderBy: {
    createdAt: "desc",
   },
  })

  const safeListings = listings.map((listing) => ({
   ...listing,
   createdAt: listing.createdAt.toISOString(),
  }))

  return safeListings
 } catch (error: any) {
  throw new Error(error)
 }
}
