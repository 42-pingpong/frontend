import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatRoomDTO } from '../../../interfaces/Chatting-Format.dto';

export const ChatList = memo(function ChatList({
  props,
}: {
  props: ChatRoomDTO;
}) {
  const navigation = useNavigate();

  const handleChatEnter = () => {
    navigation(`/chat/${props.groupChatId}/${props.levelOfPublicity}`);
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
});
