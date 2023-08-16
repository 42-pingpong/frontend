import React from 'react';
import { GameHistoryDto } from '../../interfaces/Game-HIstory.dto';
import { userInfo } from '../../atom/user';
import { useRecoilValue } from 'recoil';

export const GameHistoryList = ({ props }: { props: GameHistoryDto }) => {
  const user = useRecoilValue(userInfo);
  const myInfo = props.gameScores.find((item) => item.user.id === user.id);
  const otherInfo = props.gameScores.find((item) => item.user.id !== user.id);

  if (!myInfo || !otherInfo) {
    return null;
  }

  return (
    <div className="flex relative w-full h-16 md:h-24 bg-sky p-2 rounded-full shadow-md shadow-gray-300 items-center mb-8">
      <div className="flex w-8 h-8 md:h-14 md:w-14 rounded-full bg-white justify-center items-center ml-6">
        <p className="text-gray-500 text:lg md:text-xl">
          {myInfo.score > otherInfo.score ? 'W' : 'L'}
        </p>
      </div>
      <div className="justify-between flex items-center w-full px-[15%]">
        <div className="flex ml-1 text-gray-500 flex-col">
          <span className="">{myInfo.user.nickName}</span>
          <span className="mx-auto text-3xl">{myInfo.score}</span>
        </div>
        <span className="text-gray-500 text-2xl align-middle">vs</span>
        <div className="flex text-gray-500 flex-col">
          <span className="ml-auto ">{otherInfo.user.nickName}</span>
          <span className="mx-auto text-3xl">{otherInfo.score}</span>
        </div>
      </div>
    </div>
  );
};
