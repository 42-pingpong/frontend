import React, { useState, useEffect } from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';
import { GameHistoryList } from './GameHistoryList';
import axiosInstance from '../../api/axios';
import { GameHistoryDto } from '../../interfaces/Game-HIstory.dto';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../atom/user';
import { GameSocket } from '../../sockets/GameSocket';

export const GameHistory = () => {
  const data: GameHistoryDto[] = [
    {
      gameId: 1,
      createDate: '2021-10-10',
      gameMap: 'map1',
      gameScore: [
        {
          score: 10,
          user: { id: 107112, profile: 'asd', nickName: 'jina' },
        },
        {
          score: 5,
          user: { id: 2, profile: 'asd', nickName: 'jina2' },
        },
      ],
    },
    {
      gameId: 2,
      createDate: '2021-10-10',
      gameMap: 'map1',
      gameScore: [
        {
          score: 2,
          user: { id: 107112, profile: 'asd', nickName: 'jina' },
        },
        {
          score: 5,
          user: { id: 2, profile: 'asd', nickName: 'jina2' },
        },
      ],
    },
  ];

  const [gameHistory, setGameHistory] = useState<GameHistoryDto[]>([]);
  const user = useRecoilValue(userInfo);
  console.log('hi');

  useEffect(() => {
    console.log('??');
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/game/history/${user.id}`);
        // const gameHistoryData = res.data;
        console.log(res);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log(gameHistory);

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Game History" nonAddButton={true} />
      </div>
      <div className="flex flex-grow flex-col p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl overflow-y-auto">
        {data.map((item: GameHistoryDto) => (
          <GameHistoryList key={item.gameId} props={item} />
        ))}
      </div>
    </div>
  );
};
