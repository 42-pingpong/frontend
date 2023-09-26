import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  player1PaddleState,
  player2PaddleState,
  endState,
  startState,
  displayXState,
  displayYState,
  paddleHeightState,
  disconnectState,
} from '../../../atom/game';
import { Ready } from './Ready';
import { End } from './End';
import { GameLogic } from './GameLogic';
import { DisconnectWin } from './DisconnectWin';

export const PongGame = ({ props }: { props: number }) => {
  const paddleWidth = 25;
  const containerWidth = 1400;

  const player1Paddle = useRecoilValue(player1PaddleState);
  const player2Paddle = useRecoilValue(player2PaddleState);

  const start = useRecoilValue(startState);
  const end = useRecoilValue(endState);

  const displayX = useRecoilValue(displayXState);
  const displayY = useRecoilValue(displayYState);

  const paddleHeight = useRecoilValue(paddleHeightState);
  const disconnect = useRecoilValue(disconnectState);
  GameLogic({ props });

  if (start === false && end === false) {
    return (
      <div className="pong-game-container">
        <div className="pong-game">
          <Ready />
          <div
            className="absolute w-[25px] bg-[#97D2DD] rounded-[10px]"
            style={{ top: player1Paddle, height: paddleHeight }}
          ></div>
          <div
            className="absolute w-[25px] bg-[#97D2DD] rounded-[10px]"
            style={{
              top: player2Paddle,
              left: containerWidth - paddleWidth,
              height: paddleHeight,
            }}
          ></div>
          <div
            className="absolute w-[30px] h-[30px] bg-[#727DE3] rounded-[50%]"
            style={{ top: displayY, left: displayX }}
          ></div>
        </div>
      </div>
    );
  }

  if (disconnect === true) {
    return <DisconnectWin></DisconnectWin>;
  }

  return (
    <div className="pong-game-container">
      <div className="pong-game">
        {end === true ? <End /> : null}

        <div
          className="absolute w-[25px] bg-[#97D2DD] rounded-[10px]"
          style={{ top: player1Paddle, height: paddleHeight }}
        ></div>
        <div
          className="absolute w-[25px] bg-[#97D2DD] rounded-[10px]"
          style={{
            top: player2Paddle,
            left: containerWidth - paddleWidth,
            height: paddleHeight,
          }}
        ></div>
        <div
          className="absolute w-[30px] h-[30px] bg-[#727DE3] rounded-[50%]"
          style={{ top: displayY, left: displayX }}
        ></div>
      </div>
    </div>
  );
};
