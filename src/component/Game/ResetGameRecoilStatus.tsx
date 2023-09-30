import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
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
  isLeftState,
  disconnectState,
} from '../../atom/game';
import { useEffect } from 'react';
import { GameSocket } from '../../sockets/GameSocket';
import { userInfo } from '../../atom/user';

export const ResetGameRecoilStatus = () => {
  const func1 = useResetRecoilState(newMatching);
  const func2 = useResetRecoilState(ballXState);
  const func3 = useResetRecoilState(ballYState);
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
  const func24 = useResetRecoilState(isLeftState);
  const func25 = useResetRecoilState(disconnectState);

  const end = useRecoilValue(endState);
  const [reset, setReset] = useRecoilState(resetState);
  const join = useRecoilValue(joinState);

  const user = useRecoilValue(userInfo);
  const roomId = useRecoilValue(roomIdState);
  const playerNumber = useRecoilValue(playerNumberState);
  const setDisconnect = useSetRecoilState(disconnectState);

  useEffect(() => {
    if (join === true && end === false) {
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
      GameSocket.emit('room-out');
      setReset(!reset);
      setDisconnect(true);
    }
  }, []);

  useEffect(() => {
    func1();
    func2();
    func3();
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
    func24();
    func25();
  }, [reset]);

  return null;
};
