import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

type Params = {
  conversationId: string;
};

export default async function POST(request: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    /** 유저 인증 문제로 인한 클라이언트 요청 에러 */
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    /** 기존 대화를 불러온다 */
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    /** 대화가 없는 경우 */
    if (!conversation) {
      return new NextResponse('Not Found', { status: 404 });
    }

    /** 대화에 참여한 유저가 아닌 경우 */
    if (!conversation.users.find((user) => user.id === currentUser.id)) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    /** 마지막 메시지 찾기 */
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    /** 마지막 메시지의 'seen'을 갱신 */
    const updatedMessages = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        seen: true,
        sender: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    /** 새로 갱신된 'seen'으로 모든 connection들을 새로고침 */
    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessages],
    });

    /** 만약 유저가 메시지를 이미 봤던 거라면 더 이상 진행할 필요 없음 */
    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    /** 마지막 메시지 갱신 */
    await pusherServer.trigger(conversationId, 'message:update', updatedMessages);

    return new NextResponse('ok');
  } catch (error) {
    /** 서버 에러 */
    return new NextResponse('error', { status: 500 });
  }
}
