import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ballXState,
  ballYState,
  ballSpeedXState,
  ballSpeedYState,
  player1ScoreState,
  player2ScoreState,
  player2PaddleState,
  player1PaddleState,
  endState,
  player1NameState,
  player2NameState,
  startState,
  displayXState,
  displayYState,
  readyState,
  roomIdState,
  resetState,
  joinState,
  paddleHeightState,
} from '../../atom/game';
import { GameSocket } from '../../sockets/GameSocket';
import { userInfo } from '../../atom/user';

export const PongGame = ({ props }: { props: number }) => {
  const paddleWidth = 25;
  const ballSize = 30;

  const containerWidth = 1400;
  const containerHeight = 830;
  const WINSCORE = 0;

  const [player1Paddle, setPlayer1Paddle] = useRecoilState(player1PaddleState);
  const [player2Paddle, setPlayer2Paddle] = useRecoilState(player2PaddleState);

  const [loop, setLoop] = useState(false);

  const [ballX, setBallX] = useRecoilState(ballXState);
  const [ballY, setBallY] = useRecoilState(ballYState);
  const [ballSpeedX, setBallSpeedX] = useRecoilState(ballSpeedXState);
  const [ballSpeedY, setBallSpeedY] = useRecoilState(ballSpeedYState);

  const player1Score = useRecoilValue(player1ScoreState);
  const player2Score = useRecoilValue(player2ScoreState);

  const [start, setStart] = useRecoilState(startState);
  const [end, setEnd] = useRecoilState(endState);

  const player1Name = useRecoilValue(player1NameState);
  const player2Name = useRecoilValue(player2NameState);

  const [displayX, setDisplayX] = useRecoilState(displayXState);
  const [displayY, setDisplayY] = useRecoilState(displayYState);
  const [ready, setReady] = useRecoilState(readyState);

  const user = useRecoilValue(userInfo);
  const roomId = useRecoilValue(roomIdState);

  const [reset, setReset] = useRecoilState(resetState);
  const setJoin = useSetRecoilState(joinState);
  const [isLeft, setIsLeft] = useState(false);
  const paddleHeight = useRecoilValue(paddleHeightState);

  useEffect(() => {
    setJoin(true);

    GameSocket.on('ready', (start: boolean) => {
      setReady(start);
    });

    GameSocket.on('start', (start: boolean) => {
      setStart(start);
    });

    GameSocket.on('move', (e: string) => {
      if (e === 'w') {
        setPlayer1Paddle((prev) => Math.max(prev - 30, 0));
      } else if (e === 's') {
        setPlayer1Paddle((prev) =>
          Math.min(prev + 30, containerHeight - paddleHeight)
        );
      } else if (e === 'ArrowUp') {
        setPlayer2Paddle((prev) => Math.max(prev - 30, 0));
      } else if (e === 'ArrowDown') {
        setPlayer2Paddle((prev) =>
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

    GameSocket.on('end-room-out', (winner: boolean) => {
      setEnd(true);
      setStart(false);
      setIsLeft(true);
    });

    return () => {
      GameSocket.off('ready');
      GameSocket.off('start');
      GameSocket.off('move');
      GameSocket.off('ballX');
      GameSocket.off('ballY');
      GameSocket.off('score');
      GameSocket.off('end-room-out');
      setReset(!reset);
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
      ballX <= paddleWidth &&
      ballY + ballSize >= player1Paddle &&
      ballY <= player1Paddle + paddleHeight
    ) {
      setBallSpeedX((prevSpeedX) => -prevSpeedX);
    } else if (
      ballX + ballSize >= containerWidth - paddleWidth &&
      ballY + ballSize >= player2Paddle &&
      ballY <= player2Paddle + paddleHeight
    ) {
      setBallSpeedX((prevSpeedX) => -prevSpeedX);
    }
  };

  const handleBallOutOfBound = () => {
    if (props === 2) return;
    if (ballX < 0 || ballX > containerWidth - ballSize) {
      const correctedX = containerWidth / 2;

      ballX <= 0
        ? GameSocket.emit('player2Score-set', player2Score + 1)
        : GameSocket.emit('player1Score-set', player1Score + 1);

      setBallX(correctedX);
      if (props === 1) GameSocket.emit('ballX-set', correctedX);
      setBallSpeedX((prevSpeedX) => -prevSpeedX);
    }

    if (ballY < 0 || ballY > containerHeight - ballSize) {
      const correctedY = ballY < 0 ? 0 : containerHeight - ballSize;

      setBallY(correctedY);
      if (props === 1) GameSocket.emit('ballY-set', correctedY);
      setBallSpeedY((prevSpeedY) => -prevSpeedY);
    }
  };

  useEffect(() => {
    if (start === true) {
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
      setBallX((prevX) => prevX + ballSpeedX);
      setBallY((prevY) => prevY + ballSpeedY);
      GameSocket.emit('ballX-set', ballX);
      GameSocket.emit('ballY-set', ballY);
    }
    setLoop(false);
    if (player2Score > WINSCORE || player1Score > WINSCORE) {
      setStart(false);
      setEnd(true);
    }
  }, [loop]);

  useEffect(() => {
    if (end === true) {
      props === 1
        ? GameSocket.emit('end', {
            userId: user.id,
            gameId: roomId,
            score: player1Score,
          })
        : GameSocket.emit('end', {
            userId: user.id,
            gameId: roomId,
            score: player2Score,
          });
    }
  }, [end]);

  useEffect(() => {
    handleBallOutOfBound();
    handleBallCollisions();
  }, [ballX, ballY]);

  const Ready = () => {
    return (
      <div className="justify-center flex mt-[200px]">
        {ready === false ? (
          <span
            className="text-gray-500 text-bold text-[200px]"
            onClick={() => GameSocket.emit('ready')}
          >
            Ready
          </span>
        ) : (
          <span
            className="text-[#97D2DD] text-bold text-[200px]"
            onClick={() => GameSocket.emit('ready')}
          >
            Ready
          </span>
        )}
      </div>
    );
  };

  const End = () => {
    const winner = player2Score > player1Score ? player2Name : player1Name;

    return (
      <div className="justify-center flex mt-[300px]">
        <span className="text-gray-500 text-bold text-[100px]">
          {isLeft === true ? user.nickName : winner} win !!
        </span>
      </div>
    );
  };

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
