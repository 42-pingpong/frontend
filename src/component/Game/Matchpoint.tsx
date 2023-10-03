import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  player2ScoreState,
  player1ScoreState,
  player1NameState,
  player2NameState,
  enemyIdState,
} from '../../atom/game';

import { useEffect, useState } from 'react';
import { GameSocket } from '../../sockets/GameSocket';
import { userInfo } from '../../atom/user';

export const Matchpoint = () => {
  const [player1Score, setPlayer1Score] = useRecoilState(player1ScoreState);
  const [player2Score, setPlayer2Score] = useRecoilState(player2ScoreState);
  const [player1Name, setPlayer1Name] = useRecoilState(player1NameState);
  const [player2Name, setPlayer2Name] = useRecoilState(player2NameState);
  const setEnemyId = useSetRecoilState(enemyIdState);
  const user = useRecoilValue(userInfo);
  const [p1Name, setP1] = useState('');
  const [p2Name, setP2] = useState('');

  useEffect(() => {
    GameSocket.emit('join', user.id);

    GameSocket.on('user-name', (p1: string, p2: string) => {
      setP1(p1);
      setP2(p2);
    });

    GameSocket.on('user-id', (enemyId: number) => {
      setEnemyId(enemyId);
    });

    GameSocket.on('player1Score', (score: number) => {
      setPlayer1Score(score);
    });

    GameSocket.on('player2Score', (score: number) => {
      setPlayer2Score(score);
    });

    return () => {
      GameSocket.off('user-id');
      GameSocket.off('user-name');
      GameSocket.off('player1Score');
      GameSocket.off('player2Score');
    };
  }, []);

  useEffect(() => {
    setPlayer1Name(p1Name);
    setPlayer2Name(p2Name);
  }, [p1Name, p2Name, setP1, setP2]);

  return (
    <div className="relative md:h-20 px-auto  h-14 bg-sky p-2 rounded-full grid grid-cols-3 shadow-md shadow-gray-300 justify-between items-center">
      <span className="text-gray-500 text-3xl grid-cols-1 pl-10">
        {player1Name}
      </span>
      <div
        id="player1-score"
        className="px-10 font-semibold text-5xl text-gray-500 flex gap-10"
      >
        <div className=" grid-cols-1">
          <span> {player1Score} </span>
        </div>
        <div className="px-auto text-5xl text-gray-500">
          <span> : </span>
        </div>
        <div className="font-semibold text-5xl text-gray-500">
          <span> {player2Score} </span>
        </div>
      </div>
      <span className=" grid-cols-1 text-gray-500 text-3xl text-right pr-10">
        {player2Name}
      </span>
    </div>
  );
};
