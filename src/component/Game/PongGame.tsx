import React, { useState, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  ballX,
  ballY,
  ballSpeedX,
  ballSpeedY,
  otherScore,
  myScore,
  myPaddle,
  otherPaddle,
  end,
  player1NameState,
  player2NameState,
  startState,
  sendingXState,
  sendingYState,
} from '../../atom/game';
import { GameSocket } from '../../sockets/GameSocket';

export const PongGame = ({ props }: { props: number }) => {
  const paddleHeight = 120;
  const paddleWidth = 25;
  const ballSize = 30;

  const containerWidth = 1400;
  const containerHeight = 830;

  const [player2PaddleState, setPlayer2PaddleState] = useRecoilState(myPaddle);
  const [player1PaddleState, setPlayer1PaddleState] =
    useRecoilState(otherPaddle);

  //   루프는 걍 돌리는 애만 해도 될 것 같아서 걍 state 썼어염
  const [loop, setLoop] = useState(false);

  const [ballXState, setBallXState] = useRecoilState(ballX);
  const [ballYState, setBallYState] = useRecoilState(ballY);
  const [ballSpeedXState, setBallSpeedXState] = useRecoilState(ballSpeedX);
  const [ballSpeedYState, setBallSpeedYState] = useRecoilState(ballSpeedY);

  const [player2ScoreState, setMyScoreState] = useRecoilState(myScore);
  const [player1ScoreState, setOtherScoreState] = useRecoilState(otherScore);

  const [start, setStart] = useRecoilState(startState);
  const [endState, setEndState] = useRecoilState(end);

  const player1Name = useRecoilValue(player1NameState);
  const player2Name = useRecoilValue(player2NameState);

  const [sendingX, setSendingX] = useRecoilState(sendingXState);
  const [sendingY, setSendingY] = useRecoilState(sendingYState);

  useEffect(() => {
    GameSocket.on('ready', (start: boolean) => {
      setStart(start);
    });

    GameSocket.on('move', (e: string) => {
      console.log('front', e);

      if (e === 'w') {
        setPlayer1PaddleState((prev) => Math.max(prev - 30, 0));
      } else if (e === 's') {
        setPlayer1PaddleState((prev) => Math.max(prev + 30, 0));
      } else if (e === 'ArrowUp') {
        setPlayer2PaddleState((prevY) => Math.max(prevY - 30, 0));
      } else if (e === 'ArrowDown') {
        setPlayer2PaddleState((prevY) => Math.max(prevY + 30, 0));
      }
    });

    GameSocket.on('ballX', (sendingX: number) => {
      console.log('emit ballX ', sendingX);
      setBallXState(() => sendingX);
    });

    GameSocket.on('ballY', (sendingY: number) => {
      console.log('emit ballY ', sendingY);
      setBallYState(() => sendingY);
    });

    return () => {
      GameSocket.off('start');
      GameSocket.off('move');
      GameSocket.off('ballX');
      GameSocket.off('ballY');
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
    if (
      ballXState <= paddleWidth &&
      ballYState + ballSize >= player2PaddleState &&
      ballYState <= player2PaddleState + paddleHeight
    ) {
      setBallSpeedXState((prevSpeedX) => -prevSpeedX);
    } else if (
      ballXState + ballSize >= containerWidth - paddleWidth &&
      ballYState + ballSize >= player1PaddleState &&
      ballYState <= player1PaddleState + paddleHeight
    ) {
      setBallSpeedXState((prevSpeedX) => -prevSpeedX);
    }
  };

  const handleBallOutOfBound = () => {
    if (ballXState <= 0 || ballXState >= containerWidth - ballSize) {
      const correctedX = containerWidth / 2;
      ballXState === 0
        ? setMyScoreState((prev) => prev + 1)
        : setOtherScoreState((prev) => prev + 1);

      setBallXState(correctedX);
      setBallSpeedXState((prevSpeedX) => -prevSpeedX);
    }

    if (ballYState < 0 || ballYState > containerHeight - ballSize) {
      const correctedY = ballYState < 0 ? 0 : containerHeight - ballSize;

      setBallYState(correctedY);
      setBallSpeedYState((prevSpeedY) => -prevSpeedY);
    }
  };

  useEffect(() => {
    console.log('start', start);
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
    console.log(ballXState, ballSpeedXState, ballYState, ballSpeedYState);
    setBallXState((prevX) => prevX + ballSpeedXState);
    // GameSocket.emit('ballX-set', ballXState, ballSpeedXState);
    // GameSocket.emit('ballY-set', ballYState, ballSpeedYState);
    setBallYState((prevY) => prevY + ballSpeedYState);
    setLoop(false);
    if (player2ScoreState > 5 || player1ScoreState > 5) {
      setStart(false);
      setEndState(true);
    }
  }, [loop]);

  useEffect(() => {
    handleBallOutOfBound();
    handleBallCollisions();
    setSendingX(ballXState);
    setSendingY(ballYState);
    GameSocket.emit('ballX-set', sendingX);
    GameSocket.emit('ballY-set', sendingY);
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
    const winner =
      player2ScoreState > player1ScoreState ? player2Name : player1Name;

    if (endState === true) {
      return (
        <div className="justify-center flex mt-[200px]">
          <span className="text-gray-500 text-bold text-[200px]">
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
            style={{ top: player2PaddleState }}
          ></div>
          <div
            className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
            style={{
              top: player1PaddleState,
              left: containerWidth - paddleWidth,
            }}
          ></div>
          <div
            className="absolute w-[30px] h-[30px] bg-[#727DE3] rounded-[50%]"
            style={{ top: sendingY, left: sendingX }}
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
          style={{ top: player2PaddleState }}
        ></div>
        <div
          className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
          style={{
            top: player1PaddleState,
            left: containerWidth - paddleWidth,
          }}
        ></div>
        <div
          className="absolute w-[30px] h-[30px] bg-[#727DE3] rounded-[50%]"
          style={{ top: sendingY, left: sendingX }}
        ></div>
      </div>
    </div>
  ) : (
    <div className="pong-game-container">
      <div className="pong-game">
        <div
          className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
          style={{ top: player2PaddleState }}
        ></div>
        <div
          className="absolute w-[25px] h-[140px] bg-[#97D2DD] rounded-[10px]"
          style={{
            top: player1PaddleState,
            left: containerWidth - paddleWidth,
          }}
        ></div>
        <div
          className="absolute w-[30px] h-[30px] bg-[#727DE3] rounded-[50%]"
          style={{ top: sendingY, left: sendingX }}
        ></div>
      </div>
    </div>
  );
};
