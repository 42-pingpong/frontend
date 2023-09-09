import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { chatRoomState } from '../../atom/chat';
import { ChatRoomDTO } from '../../interfaces/Chatting-Format.dto';
import { ChatSocket } from '../../sockets/ChatSocket';

export function useGroupChatList() {
  const [chatRoomList, setChatRoomList] = useRecoilState(chatRoomState);

  useEffect(() => {
    ChatSocket.emit('group-chat-list', (data: ChatRoomDTO[]) => {
      setChatRoomList([...data]);
    });
    ChatSocket.on('group-chat-update', handleChatRoomList);

    return () => {
      ChatSocket.off('group-chat-update', handleChatRoomList);
      ChatSocket.off('group-chat-list');
    };
  }, []);

  const handleChatRoomList = (data: ChatRoomDTO) => {
    setChatRoomList((prev) => [...prev, data]);
  };

  return chatRoomList;
}
