import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import EmptyState from '@/app/components/EmptyState';

type ChatIdProps = {
  params: {
    conversationId: string;
  };
};

/**
 * Retrieves the chat ID and renders the chat UI.
 * @param params - The parameters for retrieving the chat ID.
 * @returns The rendered chat UI.
 */
export default async function ChatId({ params }: ChatIdProps) {
  // Retrieve the conversation by ID
  const conversation = await getConversationById(params.conversationId);

  // Retrieve the messages for the conversation
  const messages = await getMessages(params.conversationId);

  // If the conversation does not exist, render the empty state
  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    );
  }

  // Render the chat UI
  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
}
