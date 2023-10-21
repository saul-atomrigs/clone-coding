import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import useConversation from './useConversation';
import { HiChat } from 'react-icons/hi';
import { HiUsers, HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { signOut } from 'next-auth/react';

/**
 * Returns an array of routes used in the application.
*/
export default function useRoutes() {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  
  /**
   * Each route object contains a label, href, icon, and active property.
   * The active property of each route is determined based on the current pathname or conversationId.
   */
  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiChat,
      active: pathname === '/conversations' || !!conversationId,
    },
    {
      label: 'Users',
      href: '/users',
      icon: HiUsers,
      active: pathname === '/users',
    },
    {
      label: 'Logout',
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle,
    },
  ], [pathname, conversationId]);

  // Return the routes array
  return routes;
}
