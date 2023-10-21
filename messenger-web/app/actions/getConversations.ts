import prisma from '../libs/prismadb';
import getCurrentUser from './getCurrentUser';

/**
 * Retrieves conversations(findMany) for the current user.
 */
export default async function getConversations() {
  // Retrieve the current user
  const currentUser = await getCurrentUser();
  
  // If the current user is not available, return an empty array
  if (!currentUser?.id) return [];
  
  try {
    // Retrieve conversations for the current user
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    // Return the list of conversations
    return conversations;
  } catch (error) {
    console.error(error);
    // Return an empty array in case of an error
    return [];
  }
}
