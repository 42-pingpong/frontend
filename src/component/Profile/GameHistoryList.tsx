import React from 'react';
import { GameHistoryData } from '../Profile/GameHistory';

export const GameHistoryList = ({ props }: { props: GameHistoryData }) => {
  return (
    <div className="flex relative w-full h-16 md:h-24 bg-sky p-2 rounded-full shadow-md shadow-gray-300 items-center mb-8">
      <div className="flex w-8 h-8 md:h-14 md:w-14 rounded-full bg-white justify-center items-center mx-4">
        <p className="text-gray-500 text:lg md:text-xl">
          {props.player1Score > props.player2Score ? 'W' : 'L'}
        </p>
      </div>
      <div className="justify-between flex items-center w-full px-20">
        <div className="flex ml-1 text-gray-500  flex-col">
          <span className="text-sm">{props.player1}</span>
          <span className="mx-auto text-2xl">{props.player1Score}</span>
        </div>
        <span className="text-gray-500 text-lg align-middle">vs</span>
        <div className="flex text-gray-500 flex-col">
          <span className="ml-auto text-sm">{props.player2}</span>
          <span className="mx-auto text-2xl">{props.player2Score}</span>
        </div>
      </div>
    </div>
  );
};
