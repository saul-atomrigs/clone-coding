import getSession from './getSession';
import prisma from '@/app/libs/prismadb';

/** 현재 세션에서 유저의 이메일과 prisma(mongodb)에서 유저 이메일이 currentUser */
export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (e) {
    return null;
  }
}
