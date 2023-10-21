import getSession from './getSession';
import prisma from '@/app/libs/prismadb';

/**
 * Retrieves the current user's information from the session and the MongoDB database.
 */
export default async function getCurrentUser() {
  try {
    // Retrieve the current session
    const session = await getSession();

    // Check if the session exists and has a user email
    if (!session?.user?.email) {
      return null;
    }

    // Find the user in the MongoDB database using the session user email
    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    // Check if the user exists
    if (!currentUser) {
      return null;
    }

    // Return the current user
    return currentUser;
  } catch (e) {
    console.log('getCurrentUser error: ', e);
    return null;
  }
}
