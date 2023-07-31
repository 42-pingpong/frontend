import React from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';
import { GameProgress } from './GameProgress';

export const GameMatch = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Game" />
      </div>
      <div className="flex flex-col w-full h-60 flex-grow px-10 rounded-[2rem] shadow-2xl bg-white">
        <GameProgress />
      </div>
    </div>
  );
};
