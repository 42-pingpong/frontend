import React, { useEffect } from 'react';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { ChatList } from './ChatList';
import './styles.css';
import { useRecoilState } from 'recoil';
import { chatRoomState } from '../../../atom/chat';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { IChatRoom } from '../../../interfaces/Chatting-Format.dto';
import { Chat } from '../Chat';

export const ChatRoom = () => {
  const [ChatRoomList, setChatRoomList] = useRecoilState(chatRoomState);

  const handleChatRoomList = (data: IChatRoom) => {
    setChatRoomList((prev) => [...prev, data]);
  };

  useEffect(() => {
    ChatSocket.connect();
    ChatSocket.on('group-chat-update', handleChatRoomList);
    ChatSocket.emit('group-chat-list', (data: IChatRoom[]) => {
      setChatRoomList([...data]);
    });

    return () => {
      ChatSocket.off('group-chat-update', handleChatRoomList);
      ChatSocket.off('group-chat-list');
      ChatSocket.disconnect();
      console.log('chatsocket disconnect');
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Chat" />
      </div>
      <div className="flex flex-grow p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl ">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-y-7 gap-x-10 overflow-y-auto p-3 items-center justify-center">
          {ChatRoomList.map((item) => (
            <ChatList key={item.roomId} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
