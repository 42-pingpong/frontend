import React, { useEffect } from 'react';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { ChatList } from './ChatList';
import './styles.css';
import { useRecoilState } from 'recoil';
import { chatRoomState, dmRoomState } from '../../../atom/chat';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { ChatRoomDTO } from '../../../interfaces/Chatting-Format.dto';
import { Chat } from '../Chat';

export const ChatRoom = () => {
  const [ChatRoomList, setChatRoomList] = useRecoilState(chatRoomState);
  const [DMRoomList, setDMRoomList] = useRecoilState(dmRoomState);

  const handleChatRoomList = (data: ChatRoomDTO) => {
    setChatRoomList((prev) => [...prev, data]);
  };

  const handleDMRoomList = (data: ChatRoomDTO) => {
    setDMRoomList((prev) => [...prev, data]);
  };

  useEffect(() => {
    ChatSocket.on('group-chat-update', handleChatRoomList);
    ChatSocket.emit('group-chat-list', (data: ChatRoomDTO[]) => {
      setChatRoomList([...data]);
    });

    return () => {
      ChatSocket.off('group-chat-update', handleChatRoomList);
      ChatSocket.off('group-chat-list');
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Chat" />
      </div>
      <div className="flex flex-grow flex-col px-10 pt-5 pb-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl ">
        <div className="flex flex-row w-full h-16 shadow-[0_25px_10px_-20px_rgba(0,0,0,0.05)]">
          <span className="flex justify-center w-full items-center font-bold text-3xl text-borderBlue px-5 mb-1">
            Group Chat
          </span>
          <span className="flex justify-center w-full items-center font-bold text-3xl text-borderBlue px-5 mb-1">
            Direct Message
          </span>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-7 overflow-y-auto w-full items-center justify-center">
          <div className="grid p-5">
            {ChatRoomList.map((item) => (
              <ChatList key={item.groupChatId} props={item} />
            ))}
          </div>
          <div className="grid p-5">
            {ChatRoomList.map((item) => (
              <ChatList key={item.groupChatId} props={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
