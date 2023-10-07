import React, { useState, useEffect } from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';
import { GameHistoryList } from './GameHistoryList';
import axiosInstance from '../../api/axios';
import { GameHistoryDto } from '../../interfaces/Game-HIstory.dto';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../atom/user';
import { UserDto } from '../../interfaces/User.dto';

export const GameHistory = (props: { nickName: string | undefined }) => {
  const [ret, setRet] = useState<{ data: GameHistoryDto[] }>({ data: [] });
  const user = useRecoilValue(userInfo);
  const nickName = props.nickName ? props.nickName : user.nickName;
  const [userId, setUserId] = useState<number>(-1);

  useEffect(() => {
    if (props.nickName === undefined) {
      setUserId(user.id);
      return;
    } else fetchUser();
  }, [user]);

  const fetchUser = async () => {
    const res = await axiosInstance.get(`/user/search?nickName=${nickName}`);
    if (res.data[0] === undefined) {
      alert('유저를 찾을 수 없습니다.');
      window.location.href = '/';
    }
    console.log(res.data);
    const user = res.data.find((user: UserDto) => user.nickName === nickName);
    setUserId(user.id);
  };

  const fetchData = async () => {
    console.log(userId);
    try {
      const res = await axiosInstance.get(`/game/history/${userId}`);
      setRet({ data: res.data });
    } catch (err) {
      console.log('에러에러에러에러에러');
    }
  };

  useEffect(() => {
    if (userId !== -1) fetchData();
  }, [userId]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Game History" nonAddButton={true} />
      </div>
      <div className="flex flex-grow flex-col p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl overflow-y-auto">
        {ret.data.map((item: GameHistoryDto) => (
          <GameHistoryList key={item.gameId} props={item} id={userId} />
        ))}
      </div>
    </div>
  );
};
