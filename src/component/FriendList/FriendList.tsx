import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { friendListState, loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { ServiceTitle } from '../Main/ServiceTitle';
import { StatusIcon } from './StatusIcon';
import { Friend } from './Friend';
import { UserDto } from '../../interfaces/User.dto';
import { fetchFriendList } from '../../api/Friend/Friend';
import { BlockList } from './Block/BlockList';

const Button = ({
  onClick,
  text,
  buttonState,
}: {
  onClick: any;
  text: string;
  buttonState: boolean;
}) => (
  <button
    onClick={onClick}
    className={`${
      (text === 'Block' && buttonState) || (text === 'Friend' && !buttonState)
        ? 'text-progressBlue'
        : 'text-gray-500 '
    } font-semibold text-2xl aling-center w-full `}
  >
    {text}
  </button>
);

const StatusIconSection = () => (
  <div className="flex flex-row h-14 justify-between gap-1 px-3">
    <StatusIcon props={{ status: 'online', color: 'bg-green-400' }} />
    <StatusIcon props={{ status: 'offline', color: 'bg-red-400' }} />
    <StatusIcon props={{ status: 'ingame', color: 'bg-blue-400' }} />
  </div>
);

const FriendsSection = ({ friendList }: { friendList: UserDto[] }) => (
  <div>
    {friendList.map((item) => (
      <Friend key={item.id} props={item} />
    ))}
  </div>
);

export const FriendList = () => {
  const isLogin = useRecoilValue(loginState);
  const [userInfoState] = useRecoilState(userInfo);
  const [friendList, setFriendList] = useRecoilState(friendListState);
  const [isBlockedButton, setIsBlockedButton] = useState(false);

  useEffect(() => {
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

  const handleChangeFriendStatus = (data: UserDto) => {
    setFriendList((prevList) =>
      prevList.map((item) =>
        item.id === data.id ? { ...item, status: data.status } : item
      )
    );
  };

  return (
    <div className="flex h-full flex-col">
      <section className="flex">
        <ServiceTitle title="Friends" />
      </section>
      <section className="flex flex-col w-full h-60 flex-grow px-10 rounded-[2rem] shadow-2xl bg-white">
        <div className="flex flex-row w-full h-12 justify-between items-end mt-3">
          <Button
            text="Friend"
            buttonState={isBlockedButton}
            onClick={() => setIsBlockedButton(false)}
          />
          <Button
            text="Block"
            buttonState={isBlockedButton}
            onClick={() => setIsBlockedButton(true)}
          />
        </div>
        <div className="flex flex-col w-full h-full p-1 overflow-y-auto mt-3 mb-10">
          {isBlockedButton ? (
            <BlockList />
          ) : (
            <>
              <StatusIconSection />
              <FriendsSection friendList={friendList} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};
