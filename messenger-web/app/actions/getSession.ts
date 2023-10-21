import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

/**
 * Retrieves the session from the server.
 * 서버 세션 불러옵니다
 */
export default async function getSession() {
  // Call the getServerSession function with the authOptions parameter
  return await getServerSession(authOptions);
}
