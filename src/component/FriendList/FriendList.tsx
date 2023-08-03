import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { friendList, loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { ServiceTitle } from '../Main/ServiceTitle';
import { StatusIcon } from './StatusIcon';
import { Friend } from './Friend';
import { UserDto } from '../../interfaces/User.dto';
import { useQuery } from 'react-query';
import { fetchFriendList } from '../../api/Friend/Friend';

export const FriendList = () => {
  const isLogin = useRecoilValue(loginState);
  const [userInfoState] = useRecoilState(userInfo);
  const [friendListState, setFriendListState] = useRecoilState(friendList);

  const { data } = useQuery(
    ['userList', userInfoState.id, isLogin],
    () => fetchFriendList(userInfoState.id),
    {
      enabled: !!isLogin, // 로그인 상태일 때만 쿼리를 실행합니다.
      staleTime: 60 * 1000, // 1분
      refetchOnWindowFocus: false, // 포커스가 바뀌어도 새로고침을 하지 않음
      onSuccess: (data) => {
        setFriendListState(data);
      },
    }
  );

  useEffect(() => {
    const handleChangeFriendStatus = (data: UserDto) => {
      console.log('change-status');
      console.log(data);
      const newList = friendListState.map((item) =>
        item.id === data.id ? { ...item, status: data.status } : item
      );
      setFriendListState(newList);
    };

    StatusSocket.on('change-status', handleChangeFriendStatus);

    return () => {
      StatusSocket.off('change-status', handleChangeFriendStatus);
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex">
        <ServiceTitle title="Friends" />
      </div>
      <div className="flex flex-col w-full h-60 flex-grow px-10 rounded-[2rem] shadow-2xl bg-white">
        <div className="flex flex-row h-14 justify-between gap-1 mt-10 px-3">
          <StatusIcon props={{ status: 'online', color: 'bg-green-400' }} />
          <StatusIcon props={{ status: 'offline', color: 'bg-red-400' }} />
          <StatusIcon props={{ status: 'ingame', color: 'bg-blue-400' }} />
        </div>
        <div className="flex flex-col w-full h-full p-1 overflow-y-auto mt-3 mb-10">
          {friendListState.map((item) => (
            <Friend key={item.id} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
