import React from 'react';
import {
  CheckedAlarmDto,
  ResponseNotificationDto,
} from '../../interfaces/Request-Friend.dto';
import { StatusSocket } from '../../sockets/StatusSocket';
import { UserDto } from '../../interfaces/User.dto';
import { notiResponseState } from '../../atom/notification';
import { useRecoilState } from 'recoil';

export const ResponseFriend = ({ props }: { props: UserDto }) => {
  const [notiList, setNotiList] = useRecoilState(notiResponseState);
  const handleDeleteAlarm = () => {
    console.log('알람삭제');

    const updatedNotiList = notiList.filter((item) => item.id !== props.id);
    setNotiList(updatedNotiList);
  };

  return (
    <div className="mt-5 flex w-hull h-20 py-3 px-5 bg-sky rounded-2xl justify-between items-center shadow-md">
      <div className="flex flex-grow w-32 h-full flex-col ml-3">
        <span className="text-borderBlue font-semibold text-sm">요청 수락</span>
        <span className="text-gray-500 font-bold text-2xl">
          {props.nickName}
        </span>
      </div>
      <div className="flex-grow flex-col flex w-14 h-full items-end">
        <div
          className="h-6 w-14 rounded-full bg-white items-center justify-center flex shadow-md"
          onClick={handleDeleteAlarm}
        >
          <span className="text-sm text-gray-700">알람 삭제</span>
        </div>
      </div>
    </div>
  );
};
