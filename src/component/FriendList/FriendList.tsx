import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { friendList, loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { ServiceTitle } from '../Main/ServiceTitle';
import { StatusIcon } from './StatusIcon';
import { Friend } from './Friend';
import { UserDto } from '../../interfaces/User.dto';
import { useQuery } from 'react-query';
import { fetchUsers } from '../../api/Friend/Friend';

export const FriendList = () => {
  const isLogin = useRecoilValue(loginState);
  const [userInfoState] = useRecoilState(userInfo);
  const [userList, setUserList] = useRecoilState(friendList);

  const { data } = useQuery(
    ['userList', userInfoState.id, isLogin],
    () => fetchUsers(userInfoState.id),
    {
      enabled: !!isLogin, // 로그인 상태일 때만 쿼리를 실행합니다.
      staleTime: 60 * 1000, // 1분
      refetchOnWindowFocus: false, // 포커스가 바뀌어도 새로고침을 하지 않음
      onSuccess: (data) => {
        console.log(data);
        setUserList(data);
      },
    }
  );

  /**
   * 친구 중에서, 상태가 바뀐 친구의 정보를 줌.
   * */
  useEffect(() => {
    if (StatusSocket.connected) {
      StatusSocket.on('change-status', (data: UserDto) => {
        console.log('change-status');
        console.log(data);
      });
    }
  }, [StatusSocket]);

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
          {userList.map((item) => (
            <Friend key={item.friendId} props={item.friend} />
          ))}
        </div>
      </div>
    </div>
  );
};
