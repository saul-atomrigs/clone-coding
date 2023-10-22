import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

/**
 * Creates a new user.
 * 회원 가입 유저 계정을 생성합니다
 */
export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user in the database
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  // Return the created user as the response
  return NextResponse.json(user);
}
