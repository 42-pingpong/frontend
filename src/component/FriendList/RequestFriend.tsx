import React from 'react';
import { ResponseNotificationDto } from '../../interfaces/Request-Friend.dto';

export const RequestFriend = ({
  props,
}: {
  props: ResponseNotificationDto;
}) => {
  const handleAcceptRequest = () => {
    console.log('accept');
    if (props.requestType === 'F') {
      console.log('친구 요청 수락');
    } else if (props.requestType === 'G') {
      console.log('친구 요청 거절');
    }
  };

  const handleRejectRequest = () => {
    console.log('reject');
    if (props.requestType === 'F') {
      console.log('친구 요청 거절');
    } else if (props.requestType === 'G') {
      console.log('게임 요청 거절');
    }
  };

  return (
    <div className="mt-5 flex w-hull h-20 py-3 px-5 bg-sky rounded-2xl justify-between items-center shadow-md">
      <div className="flex flex-grow w-32 h-full flex-col ml-3">
        <span className="text-borderBlue font-semibold text-sm">
          {props.requestType === 'F'
            ? '친구 요청'
            : props.requestType === 'G'
            ? '게임 초대'
            : '채팅 초대'}
        </span>
        <span className="text-gray-500 font-bold text-2xl">
          {props.requestingUser.nickName}
        </span>
      </div>
      <div className="flex-grow flex-col flex w-14 h-full items-end">
        <div className="flex justify-end h-6 items-center ">
          <span className="text-gray-500 text-xs mb-2">{props.pastTime}</span>
        </div>
        {props.requestType !== 'C' ? (
          <div className="flex grow-0 justify-between w-32 h-6 items-center">
            <div
              className="h-6 w-14 rounded-full bg-white items-center justify-center flex shadow-md"
              onClick={handleAcceptRequest}
            >
              <span className="text-sm text-gray-700">수락</span>
            </div>
            <div
              className="h-6 w-14 rounded-full bg-white items-center justify-center flex shadow-md"
              onClick={handleRejectRequest}
            >
              <span className="text-sm text-gray-700">거절</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
