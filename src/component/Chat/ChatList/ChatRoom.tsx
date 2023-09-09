import React, { useEffect } from 'react';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { ChatList } from './ChatList';
import './styles.css';
import { useRecoilState } from 'recoil';
import { chatRoomState } from '../../../atom/chat';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { ChatRoomDTO } from '../../../interfaces/Chatting-Format.dto';
import { useGroupChatList } from '../../../hooks/chat/useGroupChatList';

export const ChatRoom = () => {
  const chatRoomList = useGroupChatList();

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Chat" />
      </div>
      <div className="flex flex-grow p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl ">
        <div className="grid grid-cols-1 gap-y-7 overflow-y-auto w-full items-start justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 p-5">
            {chatRoomList.map((item) => (
              <ChatList key={item.groupChatId} props={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
