import getUsers from '@/app/actions/getUsers';
import getConversations from '@/app/actions/getConversations';
import Sidebar from '@/app/components/sidebar/Sidebar';
import ConversationList from '@/app/conversations/components/ConversationList';

type ConversationLayoutProps = {
  children: React.ReactNode;
};

export default async function ConversationLayout({
  children,
}: ConversationLayoutProps) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className='h-full'>
        <ConversationList
          users={users}
          title='Conversations'
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
