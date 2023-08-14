import getSession from './getSession';
import prisma from '@/app/libs/prismadb';

/** 세션에서 유저 이메일을 받아와서 prisma findMany 메서드를 통해 현재 유저의 이메일과 다른 모든 나머지 이메일들을 반환 (users) */
export default async function getUsers() {
  const session = await getSession();

  /** 현재 세션에서 유저 이메일을 찾을 수 없다면 빈 배열을 반환 */
  if (!session?.user?.email) {
    return [];
  }

  /** findMany 메서드를 이용해서 유저들을 얻어옴 */
  try {
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
    return [];
  }
}
