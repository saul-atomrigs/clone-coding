import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import prisma from "@/app/libs/prismadb"

/**
 * POST /api/register
 * 신규 유저 회원가입 API
 */
export async function POST(request: Request) {
 const body = await request.json()
 const { email, name, password } = body

 const hashedPassword = await bcrypt.hash(password, 12)

 const user = await prisma.user.create({
  data: {
   email,
   name,
   hashedPassword,
  },
 })

 return NextResponse.json(user)
}
