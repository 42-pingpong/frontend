import { notificationModalState, profileModalState } from '../../atom/modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { notificationState } from '../../atom/notification';
import {
  CheckedAlarmDto,
  ResponseNotificationDto,
} from '../../interfaces/Request-Friend.dto';

const Profile = () => {
  const userInfoObj = useRecoilValue(userInfo);
  const isLoggedIn = useRecoilValue(loginState);
  const [notificationList, setNotificationList] =
    useRecoilState(notificationState);
  const [notification, setNotification] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] =
    useRecoilState(profileModalState);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useRecoilState(
    notificationModalState
  );
  const prevNotificationList = useRef<ResponseNotificationDto[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('saveNotificationList called');
      const saveNotificationList = (data: ResponseNotificationDto) => {
        if (data === null) return;
        setNotificationList((prevList) => [...prevList, data]);
        setNotification(true);
      };

      console.log('connect');
      StatusSocket.connect();
      StatusSocket.on('alarms', (data) => {
        console.log('alarms');
        console.log(data);
      });
      StatusSocket.on('request-friend-from-user', saveNotificationList);

      return () => {
        StatusSocket.off('request-friend-from-user', saveNotificationList);
        StatusSocket.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (
      isNotificationModalOpen &&
      notificationList.length > 0 &&
      prevNotificationList.current !== notificationList
    ) {
      const checkedAlarmList: CheckedAlarmDto[] = notificationList
        .filter((item) => !isUserDuplicated(item.requestId))
        .map((item) => ({ requestId: item.requestId }));

      console.log('checkedAlarmList');
      console.log(checkedAlarmList);
      StatusSocket.emit('checked-alarm', checkedAlarmList);
      prevNotificationList.current = notificationList;
    }
  }, [notificationList, isNotificationModalOpen, isLoggedIn]);

  //나중에 utils로 빼기
  const isUserDuplicated = (id: number) => {
    return prevNotificationList.current.some((item) => item.requestId === id);
  };

  const handelNotificationClicked = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
    setNotification(false);
  };

  return (
    <div className=" flex flex-row justify-center items-center">
      <div
        className="w-14 h-10 justify-start items-center flex"
        onClick={handelNotificationClicked}
      >
        <div
          className={`w-5 h-5 rounded-full ${
            notification ? 'bg-progressBlue' : 'bg-gray-300'
          } `}
        />
      </div>
      <img
        src={userInfoObj.profile}
        alt="Profile"
        className="w-14 h-14 object-cover rounded-full border-borderBlue border-2"
        onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
      />
    </div>
  );
};

export default Profile;
