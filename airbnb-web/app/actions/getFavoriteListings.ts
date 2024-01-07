import prisma from "@/app/libs/prismadb"

import getCurrentUser from "./getCurrentUser"

/**
 * Retrieves the favorite listings for the current user.
 *
 * 현재 유저의 favorite listing 목록를 반환
 */
export default async function getFavoriteListings() {
 try {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
   return []
  }

  const favorites = await prisma.listing.findMany({
   where: {
    id: {
     in: [...(currentUser.favoriteIds || [])],
    },
   },
  })

  const safeFavorites = favorites.map((favorite) => ({
   ...favorite,
   createdAt: favorite.createdAt.toString(),
  }))

  return safeFavorites
 } catch (error: any) {
  throw new Error(error)
 }
}
