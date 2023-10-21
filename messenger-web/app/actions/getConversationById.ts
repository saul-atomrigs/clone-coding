import getCurrentUser from './getCurrentUser'
import prisma from '../libs/prismadb'

/**
 * Retrieves a conversation(findUnique) by its ID.
 * 
 * @param conversationId - The ID of the conversation to retrieve.
 * @returns The conversation object if found, or null otherwise.
 */
export default async function getConversationById(conversationId: string) {
  try {
    // Retrieve the current user
    const currentUser = await getCurrentUser()

    // If the current user doesn't have an email, return null
    if (!currentUser?.email) {
      return null
    }

    // Retrieve the conversation by its ID, including the users associated with it
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true
      },
    })

    return conversation
  } catch (e: any) {
    console.log('getConversationById error: ', e)
    return null
  }
}
