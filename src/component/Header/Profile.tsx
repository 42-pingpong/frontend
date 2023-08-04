import { notificationModalState, profileModalState } from '../../atom/modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { useEffect, useRef, useState } from 'react';
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
      //여기서부터 따라가면 됨
      const saveNotificationList = (
        data: ResponseNotificationDto[] | ResponseNotificationDto
      ) => {
        console.log('request-friend-from-user');
        console.log(data);
        const dataArray = Array.isArray(data) ? data : [data];
        setNotificationList(dataArray);
        setNotification(true);
      };

      console.log('connect');
      StatusSocket.connect();

      StatusSocket.on('request-friend-from-user', saveNotificationList);

      return () => {
        StatusSocket.disconnect();
      };
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (
      isNotificationModalOpen &&
      notificationList.length > 0 &&
      prevNotificationList.current !== notificationList
    ) {
      const checkedAlarmList: CheckedAlarmDto[] = notificationList.map(
        (item) => ({
          requestId: item.requestId,
        })
      );

      console.log('checkedAlarmList');
      console.log(checkedAlarmList);
      StatusSocket.emit('checked-alarm', checkedAlarmList);
      prevNotificationList.current = notificationList;
    }
  }, [notificationList, isNotificationModalOpen, isLoggedIn]);

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
