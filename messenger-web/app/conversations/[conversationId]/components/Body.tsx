'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { find } from 'lodash';

import { pusherClient } from '@/app/libs/pusher';
import useConversation from '@/app/hooks/useConversation';
import MessageBox from './MessageBox';
import { FullMessageType } from '@/app/types';

type BodyProps = {
  initialMessages: FullMessageType[];
};

/**
 
 Body component represents the main body of the conversation view.
 It displays the list of messages and handles message updates and scrolling.

 채팅방(MessageBox) 목록을 보여주는 UI. 메시지 업데이트 및 스크롤 기능을 제공합니다.

 */

export default function Body({ initialMessages = [] }: BodyProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();

  // Mark the conversation as seen when the conversation ID changes
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  // Subscribe to pusher channel and handle message updates
  useEffect(() => {
    pusherClient.subscribe(conversationId);
    // Scroll to the bottom of the message list
    bottomRef?.current?.scrollIntoView();
    // Handle new messages received
    const messageHandler = (message: FullMessageType) => {
      // Mark the conversation as seen
      axios.post(`/api/conversations/${conversationId}/seen`);
      // Add the new message to the list if it doesn't already exist
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      // Scroll to the bottom of the message list
      bottomRef?.current?.scrollIntoView();
    };

    // Handle message updates
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
          return currentMessage;
        })
      );
    };

    // Bind the message event listeners
    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    // Unsubscribe and unbind the event listeners when the component is unmounted
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className='pt-24' ref={bottomRef} />
    </div>
  );
}
