import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatRoomState } from '../../atom/chat';
import { ChatRoomDTO } from '../../interfaces/Chatting-Format.dto';
import { ChatSocket } from '../../sockets/ChatSocket';
import { loginState, userInfo } from '../../atom/user';

export function useGroupChatList() {
  const [chatRoomList, setChatRoomList] = useRecoilState(chatRoomState);
  const isLogin = useRecoilValue(loginState);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    if (isLogin && user.id !== -1) {
      ChatSocket.emit('group-chat-list', (data: ChatRoomDTO[]) => {
        setChatRoomList([...data]);
      });
      ChatSocket.on('group-chat-update', handleChatRoomList);

      return () => {
        ChatSocket.off('group-chat-update', handleChatRoomList);
        ChatSocket.off('group-chat-list');
      };
    }
  }, [isLogin, user]);

  const handleChatRoomList = (data: ChatRoomDTO) => {
    setChatRoomList((prev) => [...prev, data]);
  };

  return chatRoomList;
}
