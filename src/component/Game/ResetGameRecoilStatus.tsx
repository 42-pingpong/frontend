import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  ballSpeedXState,
  ballSpeedYState,
  ballXState,
  ballYState,
  displayXState,
  displayYState,
  endState,
  resetState,
  joinState,
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
import { GameSocket } from '../../sockets/GameSocket';
import { userInfo } from '../../atom/user';

export const ResetGameRecoilStatus = () => {
  const func1 = useResetRecoilState(newMatching);
  const func2 = useResetRecoilState(ballXState);
  const func3 = useResetRecoilState(ballYState);
  // const func4 = useResetRecoilState(ballSpeedXState);
  // const func5 = useResetRecoilState(ballSpeedYState);
  const func6 = useResetRecoilState(player1ScoreState);
  const func7 = useResetRecoilState(player2ScoreState);
  const func8 = useResetRecoilState(player1PaddleState);
  const func9 = useResetRecoilState(player2PaddleState);
  const func10 = useResetRecoilState(startState);
  const func11 = useResetRecoilState(endState);
  const func15 = useResetRecoilState(displayXState);
  const func16 = useResetRecoilState(displayYState);
  const func17 = useResetRecoilState(readyState);
  const func18 = useResetRecoilState(playerNumberState);
  const func19 = useResetRecoilState(roomIdState);
  const func20 = useResetRecoilState(player1NameState);
  const func21 = useResetRecoilState(player2NameState);
  const func22 = useResetRecoilState(resetState);
  const func23 = useResetRecoilState(joinState);

  const end = useRecoilValue(endState);
  const [reset, setReset] = useRecoilState(resetState);
  const join = useRecoilValue(joinState);

  const user = useRecoilValue(userInfo);
  const roomId = useRecoilValue(roomIdState);
  const player1Score = useRecoilValue(player1ScoreState);
  const player2Score = useRecoilValue(player2ScoreState);
  const playerNumber = useRecoilValue(playerNumberState);

  useEffect(() => {
    // 방에 들어갔었는데 끝을 안 보고 나옴
    // 1. 레디도안함
    // 2. 레디는 함
    // 3. 게임 시작함

    if (join === true && end === false) {
      console.log('reset');
      GameSocket.emit('room-out', () => {
        setReset(!reset);
      });
      playerNumber === 1
        ? GameSocket.emit('end', {
            userId: user.id,
            gameId: roomId,
            score: -42,
          })
        : GameSocket.emit('end', {
            userId: user.id,
            gameId: roomId,
            score: -42,
          });
    }
  }, []);

  useEffect(() => {
    func1();
    func2();
    func3();
    // func4();
    // func5();
    func6();
    func7();
    func8();
    func9();
    func10();
    func11();
    func15();
    func16();
    func17();
    func18();
    func19();
    func20();
    func21();
    func22();
    func23();
  }, [reset]);

  return null;
};
