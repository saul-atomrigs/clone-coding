import getCurrentUser from './getCurrentUser'
import prisma from '../libs/prismadb'

export default async function getConversationById(conversationId: string) {
  try {
    const currentUser = await getCurrentUser()


    if (!currentUser?.email) {
      return null
    }

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
    return null
  }
}
