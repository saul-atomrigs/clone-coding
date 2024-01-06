import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"

interface IParams {
 reservationId?: string
}

/**
 * DELETE /api/reservations/:reservationId
 *
 * Deletes a reservation based on the provided reservation ID.
 *
 * 예약 ID별로 예약을 삭제합니다.
 */
export async function DELETE(
 request: Request,
 { params }: { params: IParams },
) {
 const currentUser = await getCurrentUser()

 if (!currentUser) {
  return NextResponse.error()
 }

 const { reservationId } = params

 if (!reservationId || typeof reservationId !== "string") {
  throw new Error("Invalid ID")
 }

 const reservation = await prisma.reservation.deleteMany({
  where: {
   id: reservationId,
   OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
  },
 })

 return NextResponse.json(reservation)
}
