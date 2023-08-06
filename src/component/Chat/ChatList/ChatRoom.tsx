import React, { useEffect } from 'react';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { ChatList } from './ChatList';
import './styles.css';
import { useRecoilState } from 'recoil';
import { chatRoomState } from '../../../atom/chat';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { IChatRoom } from '../../../interfaces/Chatting-Format.dto';
import { Chat } from '../Chat';

// export interface chatRoomList {
//   id: number;
//   title: string;
//   people: number;
//   maxPeople: number;
//   permission: string;
// }

export const ChatRoom = () => {
  // const data: chatRoomList[] = [
  //   {
  //     id: 1,
  //     title: '채팅방1',
  //     people: 2,
  //     maxPeople: 4,
  //     permission: 'public',
  //   },
  //   {
  //     id: 2,
  //     title: '채팅방2',
  //     people: 1,
  //     maxPeople: 1,
  //     permission: 'private',
  //   },
  //   {
  //     id: 3,
  //     title: '채팅방3',
  //     people: 2,
  //     maxPeople: 2,
  //     permission: 'protected',
  //   },
  //   {
  //     id: 4,
  //     title: '채팅방4',
  //     people: 2,
  //     maxPeople: 4,
  //     permission: 'public',
  //   },
  //   {
  //     id: 5,
  //     title: '채팅방5',
  //     people: 2,
  //     maxPeople: 4,
  //     permission: 'public',
  //   },
  //   {
  //     id: 6,
  //     title: '채팅방6',
  //     people: 2,
  //     maxPeople: 4,
  //     permission: 'public',
  //   },
  //   {
  //     id: 7,
  //     title: '채팅방7',
  //     people: 2,
  //     maxPeople: 4,
  //     permission: 'public',
  //   },
  //   {
  //     id: 8,
  //     title: '채팅방7',
  //     people: 2,
  //     maxPeople: 4,
  //     permission: 'public',
  //   },
  //   {
  //     id: 9,
  //     title: '채팅방7',
  //     people: 2,
  //     maxPeople: 4,
  //     permission: 'public',
  //   },
  //   {
  //     id: 10,
  //     title: '채팅방7',
  //     people: 2,
  //     maxPeople: 4,
  //     permission: 'public',
  //   },
  // ];
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
