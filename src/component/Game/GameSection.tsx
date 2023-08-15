import { ServiceTitle } from '../Main/ServiceTitle';
import { Matchpoint } from './Matchpoint';
import { PongGame } from './PongGame';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  ballSpeedXState,
  ballSpeedYState,
  ballXState,
  ballYState,
  displayXState,
  displayYState,
  endState,
  resetState,
  newMatching,
  player1NameState,
  player1PaddleState,
  player1ScoreState,
  player2NameState,
  player2PaddleState,
  player2ScoreState,
  playerNumberState,
  readyState,
  roomIdState,
  startState,
} from '../../atom/game';
import { useEffect } from 'react';
import { ResetGameRecoilStatus } from './ResetGameRecoilStatus';

export const GameSection = () => {
  const reset = useRecoilValue(resetState);
  const playerNum = useRecoilValue(playerNumberState);

  return (
    <div id="game-section" className="flex flex-col h-full">
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
      {/* {reset && <ResetGameRecoilStatus />} */}
    </div>
  );
};
