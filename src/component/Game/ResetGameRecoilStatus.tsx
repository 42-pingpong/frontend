import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  ballSpeedXState,
  ballSpeedYState,
  ballXState,
  ballYState,
  displayXState,
  displayYState,
  endState,
  gameEndState,
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

export const ResetGameRecoilStatus = () => {
  const func1 = useResetRecoilState(newMatching);
  const func2 = useResetRecoilState(ballXState);
  const func3 = useResetRecoilState(ballYState);
  const func4 = useResetRecoilState(ballSpeedXState);
  const func5 = useResetRecoilState(ballSpeedYState);
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
  const func22 = useResetRecoilState(gameEndState);

  const start = useRecoilValue(startState);
  const end = useRecoilValue(endState);
  const ready = useRecoilValue(readyState);
  const gameEnd = useRecoilValue(gameEndState);

  useEffect(() => {
    func1();
    func2();
    func3();
    func4();
    func5();
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
    console.log('reset recoil status');
    console.log('start', start);
    console.log('end', end);
    console.log('ready', ready);
  }, [gameEnd]);

  console.log('gameEnd', gameEnd);

  return null;
};
