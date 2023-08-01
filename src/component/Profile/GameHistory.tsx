import React from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';

export const GameHistory = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Game History" nonAddButton={true} />
      </div>
      <div className="flex flex-grow flex-col p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl"></div>
    </div>
  );
};
