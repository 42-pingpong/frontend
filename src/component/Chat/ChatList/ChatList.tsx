import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { clickedRoomIdState, passwordModalState } from '../../../atom/modal';
import { ChatSocket } from '../../../sockets/ChatSocket';
import {
  ChatRoomDTO,
  ChatRoomInfoDTO,
  JoinGroupChatDTO,
} from '../../../interfaces/Chatting-Format.dto';
import { userInfo } from '../../../atom/user';
import { currentChatInfoState } from '../../../atom/chat';

export const ChatList = ({ props }: { props: ChatRoomDTO }) => {
  const navigation = useNavigate();
  const setPassword = useSetRecoilState(passwordModalState);
  const setRoomId = useSetRecoilState(clickedRoomIdState);
  const user = useRecoilValue(userInfo);
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);

  useEffect(() => {
    ChatSocket.on('join-room', handleJoinChatRoom);

    return () => {
      ChatSocket.off('join-room', handleJoinChatRoom);
    };
  }, []);

  const handleJoinChatRoom = (data: ChatRoomInfoDTO) => {
    console.log('on');
    setRoomInfo(data);
    navigation(`/chat/${props.groupChatId}`);
  };

  const handleChatEnter = () => {
    if (props.levelOfPublicity !== 'Prot') {
      const requestJoinChatRoom: JoinGroupChatDTO = {
        groupChatId: props.groupChatId,
        userId: user.id,
      };
      console.log('emit');
      ChatSocket.emit('join-room', requestJoinChatRoom);
    } else {
      setPassword(true), setRoomId(`${props.groupChatId}`);
    }
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
        <div className="flex relative mr-3 w-12 h-12 text-gray-500 text-lg md:text-2xl justify-center items-center">
          {props.levelOfPublicity === 'Prot' && (
            <img
              src={require('../../../public/lock.png')}
              alt="lock"
              className="w-3 h-4 md:w-5 md:h-6 opacity-70"
            />
          )}
        </div>
      </div>
    </div>
  );
};
