import getSession from './getSession';
import prisma from '@/app/libs/prismadb';

/**
 * Retrieves all users from the session by using the user's email and the Prisma findMany method.
 * @returns An array of users, excluding the current user's email.
 */
export default async function getUsers() {
  const session = await getSession();

  // If user email cannot be found in the current session, return an empty array
  if (!session?.user?.email) {
    return [];
  }

  try {
    // Retrieve users using the findMany method
    const users = await prisma?.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (e: any) {
    console.log('getUsers error: ', e);
    return [];
  }
}
