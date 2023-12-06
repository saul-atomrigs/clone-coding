import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';

import Header from './components/Header';
import Body from './components/Body';
import Form from './components/Form';
import EmptyState from '@/app/components/EmptyState';

type ParamsType = {
  conversationId: string;
};

/**
 * Retrieves the chat ID and renders the chat UI.
 * 채팅ID를 불러와 UI를 렌더링합니다
 */
const ChatId = async ({ params }: { params: ParamsType }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className='lg:pl-80 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ChatId;
