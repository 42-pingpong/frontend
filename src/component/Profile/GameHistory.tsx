import React from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';
import { GameHistoryList } from './GameHistoryList';

export interface GameHistoryData {
  id: number;
  player1: string;
  player1Score: number;
  player2: string;
  player2Score: number;
}

export const GameHistory = () => {
  const data: GameHistoryData[] = [
    {
      id: 1,
      player1: 'jina',
      player1Score: 10,
      player2: 'user1',
      player2Score: 5,
    },
    {
      id: 2,
      player1: 'jina2',
      player1Score: 10,
      player2: 'user2',
      player2Score: 5,
    },
    {
      id: 3,
      player1: 'jina3',
      player1Score: 10,
      player2: 'user3',
      player2Score: 5,
    },
    {
      id: 4,
      player1: 'jina4',
      player1Score: 10,
      player2: 'user4',
      player2Score: 5,
    },
    {
      id: 5,
      player1: 'jina5',
      player1Score: 10,
      player2: 'user5',
      player2Score: 5,
    },
    {
      id: 6,
      player1: 'jina6',
      player1Score: 10,
      player2: 'user6',
      player2Score: 5,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Game History" nonAddButton={true} />
      </div>
      <div className="flex flex-grow flex-col p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl overflow-y-auto">
        {data.map((item) => (
          <GameHistoryList key={item.id} props={item} />
        ))}
      </div>
    </div>
  );
};
