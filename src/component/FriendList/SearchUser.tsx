import React from 'react';
import { UserDto } from '../../interfaces/User.dto';
import { StatusSocket } from '../../sockets/StatusSocket';
import { CreateRequestFriendDto } from '../../interfaces/Request-Friend.dto';

export const SearchUserList = ({
  props,
  isDuplicated,
}: {
  props: UserDto;
  isDuplicated: boolean;
}) => {
  const RequestData: CreateRequestFriendDto = {
    requestedUserId: props.id,
  };

  const handleAddFriend = () => {
    console.log('handleAddFriend socket emit');
    StatusSocket.emit('request-friend', JSON.stringify(RequestData));
  };

  return (
    <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
      <div className="w-14 h-14 rounded-full border-2">
        <img src={require(props.profile)} />
      </div>
      <div className="flex w-1/2">
        <span className="text-gray-500 text-xl">{props.nickName}</span>
      </div>
      <div
        className={`${
          props.status === 'online'
            ? 'bg-green-400'
            : props.status === 'offline'
            ? 'bg-red-400'
            : 'bg-blue-400 '
        } w-5 h-5 mr-3 rounded-full `}
      ></div>
      <div className="flex w-10 h-6">
        {isDuplicated ? (
          <img src={require('../../public/plus.png')} className="opacity-20" /> // 이미 친구인 경우
        ) : (
          <img
            src={require('../../public/plus.png')}
            className="opacity-50"
            onClick={handleAddFriend}
          />
        )}
      </div>
    </div>
  );
};
