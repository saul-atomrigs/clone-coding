import { getServerSession } from "next-auth/next"

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from "@/app/libs/prismadb"

export async function getSession() {
 return await getServerSession(authOptions)
}

/**
 * Gets current user (and when it was created and updated and if email is verified or not) from session
 * 세션에서 이메일 정보와 MongoDB 유저 이메일이 매칭되는게 현재 유저 (current user). 유저, created, updated, email verified 프로퍼티 객체를 반환
 */
export default async function getCurrentUser() {
 try {
  const session = await getSession()

  if (!session?.user?.email) {
   return null
  }

  const currentUser = await prisma.user.findUnique({
   where: {
    email: session.user.email as string,
   },
  })

  if (!currentUser) {
   return null
  }

  return {
   ...currentUser,
   createdAt: currentUser.createdAt.toISOString(),
   updatedAt: currentUser.updatedAt.toISOString(),
   emailVerified: currentUser.emailVerified?.toISOString() || null,
  }
 } catch (error: any) {
  return null
 }
}
