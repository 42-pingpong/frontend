import React, { useState } from 'react';
import { GetFriendResponseDto } from '../../interfaces/Get-Friend.dto';
import { FriendProfileModal } from './FriendProfileModal';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  clickedFriendProfileState,
  clickedXState,
  clickedYState,
  friendProfileModalState,
} from '../../atom/modal';

export const Friend = ({ props }: { props: GetFriendResponseDto }) => {
  const [x, setX] = useRecoilState(clickedXState);
  const [y, setY] = useRecoilState(clickedYState);
  const [clicked, setClicked] = useRecoilState(friendProfileModalState);
  const [friendProfile, setFriendProfile] = useRecoilState(
    clickedFriendProfileState
  );

  return (
    <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
      {/*보더는 나중에 뺄까*/}
      <div
        className="w-14 h-14 rounded-full border-2"
        // onclick으로 좌표랑 클릭된 애 누군지 recoil로 넘김
        onClick={(e) => {
          setX(e.clientX);
          setY(e.clientY);
          setFriendProfile(props.friend);
          setClicked(true);
        }}
      >
        <img src={require('../../public/soo.png')} />
      </div>
      <div className="flex w-1/2">
        <span className="text-gray-500 text-xl">{props.friend.nickName}</span>
      </div>
      <div className="flex w-10 h-6">
        <img src={require('../../public/plane.png')} className="ml-3" />
      </div>
      <div
        className={`${
          props.friend.status === 'online'
            ? 'bg-green-400'
            : props.friend.status === 'offline'
            ? 'bg-red-400'
            : 'bg-blue-400 '
        } w-5 h-5 mr-3 rounded-full `}
      ></div>
    </div>
  );
};
