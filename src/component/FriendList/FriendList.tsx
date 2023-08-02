import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/login';
import { GetFriendResponseDto } from '../../interfaces/Get-Friend.dto';
import { StatusSocket } from '../../sockets/StatusSocket';
import { ServiceTitle } from '../Main/ServiceTitle';
import { StatusIcon } from './StatusIcon';
import { Friend } from './Friend';
import { UserDto } from '../../interfaces/User.dto';

export interface UserList {
  id: number;
  name: string;
  status: string;
  //image: string;
  //
  //
}

export const userData = [
  {
    id: 1,
    name: 'user1',
    status: 'online',
  },
  {
    id: 2,
    name: 'user2',
    status: 'offline',
  },
  {
    id: 3,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 14,
    name: 'user1',
    status: 'online',
  },
  {
    id: 23,
    name: 'user2',
    status: 'offline',
  },
  {
    id: 35,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 315,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 1,
    name: 'user1',
    status: 'online',
  },
  {
    id: 2,
    name: 'user2',
    status: 'offline',
  },
  {
    id: 3,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 14,
    name: 'user1',
    status: 'online',
  },
  {
    id: 23,
    name: 'user2',
    status: 'offline',
  },
  {
    id: 35,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 315,
    name: 'user3',
    status: 'ingame',
  },
];

const SERVER = process.env.REACT_APP_SERVER;

export const FriendList = () => {
  const [isLogin] = useRecoilState(loginState);
  const [userInfoState] = useRecoilState(userInfo);
  const [userList, setUserList] = React.useState<UserDto[]>([]);
  const userListRef = useRef(userList);

  useEffect(() => {
    if (isLogin) {
      const fetchUserList = async () => {
        try {
          const response = await axios.get(
            SERVER + `/api/user/me/friends/${userInfoState.id}?status=all`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          console.log(response.data);
          const data: UserDto[] = response.data;
          if (data !== undefined) {
            setUserList(data);
            userListRef.current = data;
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserList();
    }
    return () => {
      StatusSocket.off('change-status');
    };
  }, [isLogin]);

  useEffect(() => {
    const handleStatusChange = (data: UserDto) => {
      console.log('change-status');
      console.log(data);

      // userListRef를 기반으로 업데이트한 새로운 리스트 생성
      const newList = userListRef.current.map((item) =>
        item.id === data.id ? data : item
      );

      setUserList(newList); // 새로운 리스트로 상태를 업데이트
    };

    StatusSocket.on('change-status', handleStatusChange);

    return () => {
      StatusSocket.off('change-status', handleStatusChange);
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
          {userList.map((item) => (
            <Friend key={item.id} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
