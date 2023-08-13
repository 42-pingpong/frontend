import React, { useEffect } from 'react';
import { ChatSection } from './ChatSection';
import { UserSection } from './User/UserSection';
import { ChatRoomInfoDTO } from '../../interfaces/Chatting-Format.dto';
import { ChatSocket } from '../../sockets/ChatSocket';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentChatInfoState } from '../../atom/chat';

export const Chat = () => {
  const setRoomInfo = useSetRecoilState(currentChatInfoState);
  // 꼭 right click에서 롤 확인해라...
  useEffect(() => {
    ChatSocket.on('join-room', handleJoinChatRoom);
  }, []);

  const handleJoinChatRoom = (data: ChatRoomInfoDTO) => {
    setRoomInfo(data);
  };

  return (
    <div className="h-screen bg-slate-100 p-20 justify-center flex">
      <div className="pt-[2%] grid grid-cols-3 grid-rows-6 gap-20 w-full h-[80vh] max-w-[1800px]">
        <div className="col-span-2 row-span-6">
          <ChatSection />
        </div>
        <div className="col-span-1 row-span-6">
          <UserSection />
        </div>
      </div>
    </div>
  );
};
