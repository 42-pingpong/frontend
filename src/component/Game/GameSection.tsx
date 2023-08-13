import React, { useState, useEffect } from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';
import { Matchpoint } from './Matchpoint';
import { PongGame } from './PongGame';
import { useRecoilValue } from 'recoil';
import { endState, playerNumberState, roomIdState } from '../../atom/game';
import { ResetGameRecoilStatus } from './ResetGameRecoilStatus';

export const GameSection = () => {
  const end = useRecoilValue(endState);

  const playerNum = useRecoilValue(playerNumberState);

  return (
    <div id="game-section" className="flex flex-col h-full">
      {/* <ResetGameRecoilStatus />; */}
      <div className="flex">
        <ServiceTitle title="Pong" nonAddButton={true} />
      </div>
      <div className="rounded-3xl mx-auto justify-center z-10">
        <Matchpoint />
      </div>
      <div
        id="pong-section"
        className="top-[30px] rounded-3xl shadow-xl h-[830px] relative flex justify-center"
      >
        <div className="w-full h-[830px] game:px-0 ">
          <PongGame props={playerNum} />
        </div>
      </div>
    </div>
  );
};
