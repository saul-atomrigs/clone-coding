import prisma from '../libs/prismadb';

/**
 * Retrieves all messages for a given conversation ID.
 */
export default async function getMessages(conversationId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  } catch (e: any) {
    console.log('getMessages error: ', e);
    return [];
  }
}
