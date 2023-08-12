import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { clickedRoomIdState, passwordModalState } from '../../../atom/modal';
import { chatRoomState } from '../../../atom/chat';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { ChatRoomDTO } from '../../../interfaces/Chatting-Format.dto';
import { userInfo } from '../../../atom/user';

export const DirectMessageList = ({ props }: { props: ChatRoomDTO }) => {
  const navigation = useNavigate();
  const user = useRecoilValue(userInfo);

  const handleChatEnter = () => {
    navigation(`/chat/${props.groupChatId}`);
    ChatSocket.emit('join-room', `${props.groupChatId.toString()}`);
  };

  return (
    <div className="flex w-full px-2 py-3">
      <div
        className="flex w-full h-16 md:h-24 bg-sky p-2 rounded-full shadow-md shadow-gray-300 justify-between items-center"
        onClick={handleChatEnter}
      >
        <div className="flex w-8 h-8 md:h-14 md:w-14 rounded-full bg-white justify-center items-center">
          <p className="text-gray-500 text:lg md:text-xl">
            {props.groupChatId}
          </p>
        </div>
        <div className="flex w-1/2 ml-1 text-gray-500 text-lg md:text-2xl">
          <span>{props.chatName}</span>
        </div>
        <div className="flex relative w-16 text-gray-500 text-lg md:text-2xl">
          <span>
            {props.curParticipants} / {props.maxParticipants}
          </span>
        </div>
      </div>
    </div>
  );
};
