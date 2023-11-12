import { Listing, Reservation, User } from "@prisma/client"

export type SafeListing = Omit<Listing, "createdAt"> & {
 createdAt: string
}

/**
 * prisma/client 라이브러리가 제공하는 Reservation 타입의
 * createdAt, startDate, endDate, listing 는 Date 타입인데
 * 여기서 string 으로 바꿔줍니다.
 */
export type SafeReservation = Omit<
 Reservation,
 "createdAt" | "startDate" | "endDate" | "listing"
> & {
 createdAt: string
 startDate: string
 endDate: string
 listing: SafeListing
}

/**
 * prisma/client 라이브러리가 제공하는 User 타입의
 * createdAt, updatedAt, emailVerified 는 Date 타입인데
 * 여기서 string 으로 바꿔줍니다.
 */
export type SafeUser = Omit<
 User,
 "createdAt" | "updatedAt" | "emailVerified"
> & {
 createdAt: string
 updatedAt: string
 emailVerified: string | null
}
