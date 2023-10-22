import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

/**
 * Creates a new message and updates the conversation.
 * 새로운 메시지를 만들고 채팅 목록을 업데이트합니다
 */
export default async function POST(request: Request) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    // Parse the request body
    const body = await request.json();
    const { message, image, conversationId } = body;

    // Check if the user is authenticated
    if (!currentUser?.id || !currentUser?.email) {
      // Return an unauthorized response
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Create a new message
    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // Update the conversation
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    // Trigger a pusher event for the new message
    await pusherServer.trigger(conversationId, 'messages: new', newMessage);

    // Get the last message in the updated conversation
    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    // Trigger a pusher event to update each user's conversation
    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    // Return the new message as a JSON response
    return NextResponse.json(newMessage);
  } catch (error: any) {
    // Return a server error response
    return new NextResponse('Something went wrong', { status: 500 });
  }
}
