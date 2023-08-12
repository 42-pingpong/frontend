import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ballX,
  ballY,
  ballSpeedX,
  ballSpeedY,
  player1Score,
  player2Score,
  player2Paddle,
  player1Paddle,
  end,
  player1NameState,
  player2NameState,
  startState,
  displayXState,
  displayYState,
} from '../../atom/game';
import { GameSocket } from '../../sockets/GameSocket';

export const PongGame = ({ props }: { props: number }) => {
  const paddleHeight = 120;
  const paddleWidth = 25;
  const ballSize = 30;

  const containerWidth = 1400;
  const containerHeight = 830;
  const WINSCORE = 0;

  const [player1PaddleState, setPlayer1PaddleState] =
    useRecoilState(player1Paddle);
  const [player2PaddleState, setPlayer2PaddleState] =
    useRecoilState(player2Paddle);

  const [loop, setLoop] = useState(false);

  const [ballXState, setBallXState] = useRecoilState(ballX);
  const [ballYState, setBallYState] = useRecoilState(ballY);
  const [ballSpeedXState, setBallSpeedXState] = useRecoilState(ballSpeedX);
  const [ballSpeedYState, setBallSpeedYState] = useRecoilState(ballSpeedY);

  const player1ScoreState = useRecoilValue(player1Score);
  const player2ScoreState = useRecoilValue(player2Score);

  const [start, setStart] = useRecoilState(startState);
  const [endState, setEndState] = useRecoilState(end);

  const player1Name = useRecoilValue(player1NameState);
  const player2Name = useRecoilValue(player2NameState);

  const [displayX, setDisplayX] = useRecoilState(displayXState);
  const [displayY, setDisplayY] = useRecoilState(displayYState);

  useEffect(() => {
    GameSocket.on('ready', (start: boolean) => {
      setStart(start);
    });

    GameSocket.on('move', (e: string) => {
      console.log('front', e);

      if (e === 'w') {
        setPlayer1PaddleState((prev) => Math.max(prev - 30, 0));
      } else if (e === 's') {
        setPlayer1PaddleState((prev) =>
          Math.min(prev + 30, containerHeight - paddleHeight)
        );
      } else if (e === 'ArrowUp') {
        setPlayer2PaddleState((prev) => Math.max(prev - 30, 0));
      } else if (e === 'ArrowDown') {
        setPlayer2PaddleState((prev) =>
          Math.min(prev + 30, containerHeight - paddleHeight)
        );
      }
    });

    GameSocket.on('ballX', (x: number) => {
      setDisplayX(() => x);
    });

    GameSocket.on('ballY', (y: number) => {
      setDisplayY(() => y);
    });

    return () => {
      GameSocket.off('start');
      GameSocket.off('move');
      GameSocket.off('ballX');
      GameSocket.off('ballY');
      GameSocket.off('score');
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (props === 1) {
      if (e.key === 'w') {
        GameSocket.emit('move', 'w');
      } else if (e.key === 's') {
        GameSocket.emit('move', 's');
      }
    } else {
      if (e.key === 'ArrowUp') {
        GameSocket.emit('move', 'ArrowUp');
      } else if (e.key === 'ArrowDown') {
        GameSocket.emit('move', 'ArrowDown');
      }
    }
  };

  const handleBallCollisions = () => {
    if (props === 2) return;
    if (
      ballXState <= paddleWidth &&
      ballYState + ballSize >= player1PaddleState &&
      ballYState <= player1PaddleState + paddleHeight
    ) {
      setBallSpeedXState((prevSpeedX) => -prevSpeedX);
    } else if (
      ballXState + ballSize >= containerWidth - paddleWidth &&
      ballYState + ballSize >= player2PaddleState &&
      ballYState <= player2PaddleState + paddleHeight
    ) {
      setBallSpeedXState((prevSpeedX) => -prevSpeedX);
    }
  };

  const handleBallOutOfBound = () => {
    if (props === 2) return;
    if (ballXState < 0 || ballXState > containerWidth - ballSize) {
      const correctedX = containerWidth / 2;

      ballXState <= 0
        ? GameSocket.emit('player2Score-set', player2ScoreState + 1)
        : GameSocket.emit('player1Score-set', player1ScoreState + 1);

      setBallXState(correctedX);
      if (props === 1) GameSocket.emit('ballX-set', correctedX);
      setBallSpeedXState((prevSpeedX) => -prevSpeedX);
    }

    if (ballYState < 0 || ballYState > containerHeight - ballSize) {
      const correctedY = ballYState < 0 ? 0 : containerHeight - ballSize;

      setBallYState(correctedY);
      if (props === 1) GameSocket.emit('ballY-set', correctedY);
      setBallSpeedYState((prevSpeedY) => -prevSpeedY);
    }
  };

  useEffect(() => {
    if (start === true && endState === false) {
      window.addEventListener('keydown', handleKeyDown);
      const interval = setInterval(() => {
        setLoop(true);
      }, 30);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearInterval(interval);
      };
    }
  }, [start]);

  useEffect(() => {
    if (props === 1) {
      setBallXState((prevX) => prevX + ballSpeedXState);
      setBallYState((prevY) => prevY + ballSpeedYState);
      GameSocket.emit('ballX-set', ballXState);
      GameSocket.emit('ballY-set', ballYState);
    }
    setLoop(false);
    if (player2ScoreState > WINSCORE || player1ScoreState > WINSCORE) {
      setStart(false);
      setEndState(true);
    }
  }, [loop]);

  useEffect(() => {
    GameSocket.emit('end', { userId: 1, gameId: 2, score: 3 });
  }, [endState]);

  useEffect(() => {
    handleBallOutOfBound();
    handleBallCollisions();
  }, [ballXState, ballYState]);

  const Start = () => {
    if (start === false && endState === false) {
      return (
        <div className="justify-center flex mt-[200px]">
          <span
            className="text-gray-500 text-bold text-[200px]"
            onClick={() => GameSocket.emit('ready')}
          >
            START
          </span>
        </div>
      );
    }
    return null;
  };

  const End = () => {
    console.log('end render');
    const winner =
      player2ScoreState > player1ScoreState ? player2Name : player1Name;

    if (endState === true) {
      return (
        <div className="justify-center flex mt-[300px]">
          <span className="text-gray-500 text-bold text-[100px]">
            {winner} win !!
          </span>
        </div>
      );
    }
    return null;
  };

  if (start === false && endState === false) {
    return (
      <div className="pong-game-container">
        <div className="pong-game">
          <Start />
          <div
            className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
            style={{ top: player1PaddleState }}
          ></div>
          <div
            className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
            style={{
              top: player2PaddleState,
              left: containerWidth - paddleWidth,
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

  return endState === true ? (
    <div className="pong-game-container">
      <div className="pong-game">
        <End />
        <div
          className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
          style={{ top: player1PaddleState }}
        ></div>
        <div
          className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
          style={{
            top: player2PaddleState,
            left: containerWidth - paddleWidth,
          }}
        ></div>
        <div
          className="absolute w-[30px] h-[30px] bg-[#727DE3] rounded-[50%]"
          style={{ top: displayY, left: displayX }}
        ></div>
      </div>
    </div>
  ) : (
    <div className="pong-game-container">
      <div className="pong-game">
        <div
          className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
          style={{ top: player1PaddleState }}
        ></div>
        <div
          className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
          style={{
            top: player2PaddleState,
            left: containerWidth - paddleWidth,
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
