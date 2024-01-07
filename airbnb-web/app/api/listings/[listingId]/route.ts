import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

interface IParams {
 listingId?: string
}

/**
 * DELETE /api/listings/:listingId
 *
 * Deletes a listing based on the provided listing ID and user authentication.
 *
 * 리스팅을 삭제하는 메서드
 */
export async function DELETE(
 request: Request,
 { params }: { params: IParams },
) {
 const currentUser = await getCurrentUser()

 if (!currentUser) {
  return NextResponse.error()
 }

 const { listingId } = params

 if (!listingId || typeof listingId !== "string") {
  throw new Error("Invalid ID")
 }

 const listing = await prisma.listing.deleteMany({
  where: {
   id: listingId,
   userId: currentUser.id,
  },
 })

 return NextResponse.json(listing)
}
