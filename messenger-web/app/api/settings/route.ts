import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

/**
 * Updates the user's image and name based on the request body.
 * If the user is not authenticated, returns an Unauthorized response.
 * If there is an error, returns a Internal Server Error response.
 *
 * @param request - The HTTP request object.
 * @returns The response with the updated user data or an error response.
 */
export default async function POST(request: Request) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    // Parse the request body
    const body = await request.json();
    const { name, image } = body;

    // Check if the user is authenticated
    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Update the user's image and name
    const updateUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        image: image,
        name: name,
      },
    });

    // Return the updated user data
    return NextResponse.json(updateUser);
  } catch (error: any) {
    // Return a Internal Server Error response if there is an error
    return new NextResponse(error, { status: 500 });
  }
}
