import { useRecoilState, useRecoilValue } from 'recoil';
import {
  myScore,
  otherScore,
  player1NameState,
  player2NameState,
} from '../../atom/game';

import { useEffect, useState } from 'react';
import { GameSocket } from '../../sockets/GameSocket';
import { userInfo } from '../../atom/user';

export const Matchpoint = ({ props }: { props: number }) => {
  const myScoreState = useRecoilValue(myScore);
  const otherScoreState = useRecoilValue(otherScore);
  const [player1Name, setPlayer1Name] = useRecoilState(player1NameState);
  const [player2Name, setPlayer2Name] = useRecoilState(player2NameState);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    GameSocket.emit('join', user.id);

    GameSocket.on('user-name', (p1: string, p2: string) => {
      setPlayer1Name(p1);
      setPlayer2Name(p2);
      console.log(p1, p2);
    });

    return () => {
      GameSocket.off('user-name');
    };
  }, []);

  return (
    <div className="relative md:h-20 px-auto  h-14 bg-sky p-2 rounded-full grid grid-cols-3 shadow-md shadow-gray-300 justify-between items-center">
      <span className="text-gray-500 text-3xl grid-cols-1 pl-10">
        {player1Name}
      </span>
      <div
        id="other-score"
        className="px-10 font-semibold text-5xl text-gray-500 flex gap-10"
      >
        <div className=" grid-cols-1">
          <span> {otherScoreState} </span>
        </div>
        <div className="px-auto text-5xl text-gray-500">
          <span> : </span>
        </div>
        <div className="font-semibold text-5xl text-gray-500">
          <span> {myScoreState} </span>
        </div>
      </div>
      <span className=" grid-cols-1 text-gray-500 text-3xl text-right pr-10">
        {player2Name}
      </span>
    </div>
  );
};
