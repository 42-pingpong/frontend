import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  ballSpeedXState,
  ballSpeedYState,
  ballXState,
  ballYState,
  displayXState,
  displayYState,
  endState,
  newMatching,
  player1NameState,
  player1PaddleState,
  player1ScoreState,
  player2NameState,
  player2PaddleState,
  player2ScoreState,
  readyState,
  roomIdState,
  startState,
} from '../../atom/game';

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

  return null;
};
