import { useEffect, useState } from 'react';
import { GameSocket } from '../../sockets/GameSocket';
import { ServiceTitle } from '../Main/ServiceTitle';
import { Matchpoint } from './Matchpoint';
import { PongGame } from './PongGame';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfo } from '../../atom/user';
import { useNavigate } from 'react-router-dom';
import { playerNumber } from '../../atom/game';

export const GameSection = () => {
  const user = useRecoilValue(userInfo);
  const playerNum = useRecoilValue(playerNumber);

  return (
    <div id="game-section" className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Pong" nonAddButton={true} />
      </div>
      <div className="rounded-3xl mx-auto justify-center z-10">
        <Matchpoint props={playerNum} />
      </div>
      <div
        id="pong-section"
        className=" top-[30px] rounded-3xl shadow-xl h-[830px] relative flex justify-center"
      >
        <div className="w-full h-[830px] game:px-0 ">
          <PongGame props={playerNum} />
        </div>
      </div>
    </div>
  );
};
