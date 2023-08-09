import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { clickedRoomIdState, passwordModalState } from '../../../atom/modal';
import { chatRoomState } from '../../../atom/chat';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { ChatRoomDTO } from '../../../interfaces/Chatting-Format.dto';
import { userInfo } from '../../../atom/user';

export const ChatList = ({ props }: { props: ChatRoomDTO }) => {
  const navigation = useNavigate();
  const setPassword = useSetRecoilState(passwordModalState);
  const setRoomId = useSetRecoilState(clickedRoomIdState);
  const user = useRecoilValue(userInfo);
  const handleChatEnter = () => {
    props.levelOfPublicity === 'Prot'
      ? (setPassword(true), setRoomId(`${props.groupChatId}`))
      : navigation(`/chat/${props.groupChatId}`);
    ChatSocket.emit('join-room', `${props.groupChatId.toString()}`);
  };

  return (
    <div
      className="flex relative w-full h-16 md:h-24 bg-sky p-2 rounded-full shadow-md shadow-gray-300 justify-between items-center"
      onClick={handleChatEnter}
    >
      <div className="flex w-8 h-8 md:h-14 md:w-14 rounded-full bg-white justify-center items-center">
        <p className="text-gray-500 text:lg md:text-xl">{props.groupChatId}</p>
      </div>
      <div className="flex w-1/2 ml-1 text-gray-500 text-lg md:text-2xl">
        <span>{props.chatName}</span>
      </div>
      <div className="flex relative w-16 text-gray-500 text-lg md:text-2xl">
        <span>
          {props.curParticipants} / {props.maxParticipants}
        </span>
      </div>
      <div className="flex relative mr-3 w-12 h-12 text-gray-500 text-lg md:text-2xl justify-center items-center">
        {props.levelOfPublicity === 'Priv' ? (
          <span>me</span>
        ) : props.levelOfPublicity === 'Prot' ? (
          <img
            src={require('../../../public/lock.png')}
            alt="lock"
            className="w-3 h-4 md:w-5 md:h-6 opacity-70"
          />
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};
