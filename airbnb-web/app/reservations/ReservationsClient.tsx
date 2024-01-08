"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import axios from "axios"

import type { SafeReservation, SafeUser } from "@/app/types"
import Heading from "@/app/components/Heading"
import Container from "@/app/components/Container"
import ListingCard from "@/app/components/listings/ListingCard"

interface ReservationsClientProps {
 reservations: SafeReservation[]
 currentUser?: SafeUser | null
}

/**
 * Renders the ReservationsClient component.
 *
 * 유저의 예약 현황을 확인할 수 있는 ReservationsClient. 예약 취소 함수 포함
 */
const ReservationsClient: React.FC<ReservationsClientProps> = ({
 reservations,
 currentUser,
}) => {
 const router = useRouter()
 const [deletingId, setDeletingId] = useState("")

 const handleCancelReservation = useCallback(
  (id: string) => {
   setDeletingId(id)

   axios
    .delete(`/api/reservations/${id}`)
    .then(() => {
     toast.success("Reservation cancelled")
     router.refresh()
    })
    .catch(() => {
     toast.error("Something went wrong.")
    })
    .finally(() => {
     setDeletingId("")
    })
  },
  [router],
 )

 return (
  <Container>
   <Heading title="Reservations" subtitle="Bookings on your properties" />
   <div
    className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
    {reservations.map((reservation: any) => (
     <ListingCard
      key={reservation.id}
      data={reservation.listing}
      reservation={reservation}
      actionId={reservation.id}
      onAction={handleCancelReservation}
      disabled={deletingId === reservation.id}
      actionLabel="Cancel guest reservation"
      currentUser={currentUser}
     />
    ))}
   </div>
  </Container>
 )
}

export default ReservationsClient
