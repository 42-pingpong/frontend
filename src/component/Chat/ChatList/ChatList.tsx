import React, { useState } from 'react';
import { chatRoomList } from './ChatRoom';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { clickedRoomIdState, passwordModalState } from '../../../atom/modal';

export const ChatList = ({ props }: { props: chatRoomList }) => {
  const navigation = useNavigate();
  const setPassword = useSetRecoilState(passwordModalState);
  const setRoomId = useSetRecoilState(clickedRoomIdState);

  return (
    <div
      className="flex relative w-full h-16 md:h-24 bg-sky p-2 rounded-full shadow-md shadow-gray-300 justify-between items-center"
      onClick={() =>
        props.permission === 'protected'
          ? (setPassword(true), setRoomId(`${props.id}`))
          : navigation(`/chat/${props.id}`)
      }
    >
      <div className="flex w-8 h-8 md:h-14 md:w-14 rounded-full bg-white justify-center items-center">
        <p className="text-gray-500 text:lg md:text-xl">{props.id}</p>
      </div>
      <div className="flex w-1/2 ml-1 text-gray-500 text-lg md:text-2xl">
        <span>{props.title}</span>
      </div>
      <div className="flex relative w-16 text-gray-500 text-lg md:text-2xl">
        <span>
          {props.people} / {props.maxPeople}
        </span>
      </div>
      <div className="flex relative mr-3 w-12 h-12 text-gray-500 text-lg md:text-2xl justify-center items-center">
        {props.permission === 'private' ? (
          <span>me</span>
        ) : props.permission === 'protected' ? (
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
