import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { friendListState, loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { ServiceTitle } from '../Main/ServiceTitle';
import { StatusIcon } from './StatusIcon';
import { Friend } from './Friend';
import { UserDto } from '../../interfaces/User.dto';
import { fetchFriendList } from '../../api/Friend/Friend';

export const FriendList = () => {
  const isLogin = useRecoilValue(loginState);
  const [userInfoState] = useRecoilState(userInfo);
  const [friendList, setFriendList] = useRecoilState(friendListState);

  useEffect(() => {
    const handleChangeFriendStatus = (data: UserDto) => {
      console.log('change-status');
      console.log(data);

      setFriendList((prevList) =>
        prevList.map((item) =>
          item.id === data.id ? { ...item, status: data.status } : item
        )
      );
    };

    StatusSocket.on('change-status', handleChangeFriendStatus);

    return () => {
      StatusSocket.off('change-status', handleChangeFriendStatus);
    };
  }, []);

  useEffect(() => {
    const fetchFriendListAndSetState = async () => {
      const data = await fetchFriendList(userInfoState.id);
      setFriendList(data);
    };

    if (isLogin) {
      fetchFriendListAndSetState();
    }
  }, [isLogin]);

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
          {friendList.map((item) => (
            <Friend key={item.id} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
