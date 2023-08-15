import React, { useState, useEffect } from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';
import { GameHistoryList } from './GameHistoryList';
import axiosInstance from '../../api/axios';
import { GameHistoryDto } from '../../interfaces/Game-HIstory.dto';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../atom/user';

export const GameHistory = () => {
  const [ret, setRet] = useState<{ data: GameHistoryDto[] }>({ data: [] });

  const user = useRecoilValue(userInfo);
  console.log('hi');

  useEffect(() => {
    console.log('??');
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/game/history/${user.id}`);
        setRet({ data: res.data });
      } catch (err) {
        console.log('에러에러에러에러에러');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Game History" nonAddButton={true} />
      </div>
      <div className="flex flex-grow flex-col p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl overflow-y-auto">
        {ret.data.map((item: GameHistoryDto) => (
          <GameHistoryList key={item.gameId} props={item} />
        ))}
      </div>
    </div>
  );
};
