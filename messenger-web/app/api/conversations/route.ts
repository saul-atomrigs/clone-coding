import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb'
import {pusherServer} from '@/app/libs/pusher'

/**
 * Creates new conversation
 */
export default async function POST(request: Request) {
  try {
    // Get the current user
    const currentUser = await getCurrentUser()

    // Get the request body and destructure the required properties
    const body = await request.json()
    const { userId, isGroup, members, name } = body

    // Check if the current user is authorized
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 })
    }

    // Check if the data for a group conversation is valid
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid Data', { status: 400 })
    }

    // Create a new group conversation
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: {value:string}) => ({
                id: member.value
              }))
            ]
          }
        },
        include: {
          users: true
        }
      })

      // Trigger the 'conversation:new' event for each user in the conversation
      newConversation.users.forEach((user) => {
        if (user.email) {
          pusherServer.trigger(user.email, 'conversation:new', newConversation)
        }
      })

      return NextResponse.json(newConversation)
    }

    // Find existing conversations between the current user and the target user
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    })

    // If a conversation already exists, return it
    const singleConversation = existingConversations[0]
    if (singleConversation) {
      return NextResponse.json(singleConversation)
    }

    // Create a new conversation between the current user and the target user
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    })

    // Trigger the 'conversation:new' event for each user in the conversation
    newConversation.users.map((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:new', newConversation)
      }
    })

    return NextResponse.json(newConversation)
  } catch (e: any) {
    console.log(e)
  }
}
