import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/user';
import { GetFriendResponseDto } from '../../interfaces/Get-Friend.dto';
import { StatusSocket } from '../../sockets/StatusSocket';
import { ServiceTitle } from '../Main/ServiceTitle';
import { StatusIcon } from './StatusIcon';
import { Friend } from './Friend';
import { UserDto } from '../../interfaces/User.dto';
import axiosInstance from '../../api/axios';

export const FriendList = () => {
  const [isLogin] = useRecoilState(loginState);
  const [userInfoState] = useRecoilState(userInfo);
  const [userList, setUserList] = React.useState<GetFriendResponseDto[]>([]);

  useEffect(() => {
    if (isLogin) {
      const fetchUserList = async () => {
        try {
          const res = await axiosInstance.get<GetFriendResponseDto[]>(
            '/user/me/friends/${userInfoState.id}?status=all&includeMe=true'
          );

          console.log(res.data);

          const data: GetFriendResponseDto[] = res.data;
          if (data !== undefined) {
            setUserList(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserList();
    }
  }, [isLogin]);

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
            <Friend key={item.friendId} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
