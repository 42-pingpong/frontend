import React from 'react';
import { friendListState } from '../../../atom/user';
import { useRecoilValue } from 'recoil';
import { parse } from 'path';

export const DirectMessageRoomSign = ({ id }: { id: string }) => {
  const friendList = useRecoilValue(friendListState);

  const friend = friendList.find((friend) => friend.id === parseInt(id, 10));

  return (
    <div className="flex w-full px-2 py-3">
      <div className="flex w-full h-16 md:h-24 bg-sky p-2 rounded-full shadow-md shadow-gray-300 items-center">
        <div className="flex w-10 h-8 md:h-14 md:w-16 rounded-full bg-white justify-center items-center">
          <p className="text-gray-500 text:lg md:text-xl">DM</p>
        </div>
        <div className="flex w-full text-gray-500 text-lg md:text-[2rem] justify-center">
          <span className="mr-10">{friend?.nickName}</span>
        </div>
      </div>
    </div>
  );
};
