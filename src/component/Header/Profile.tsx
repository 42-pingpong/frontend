import { notificationModalState, profileModalState } from '../../atom/modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { friendListState, loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { notiResponseState, notificationState } from '../../atom/notification';
import {
  CheckedAlarmDto,
  ResponseNotificationDto,
} from '../../interfaces/Request-Friend.dto';
import { UserDto } from '../../interfaces/User.dto';
import { ChatSocket } from '../../sockets/ChatSocket';
import { GameSocket } from '../../sockets/GameSocket';

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
  const [notiResultList, setNotiResultList] = useRecoilState(notiResponseState);
  const [FriendList, setFriendList] = useRecoilState(friendListState);
  const prevNotificationList = useRef<ResponseNotificationDto[]>([]);

  useEffect(() => {
    if (userInfoObj.id !== -1 && isLoggedIn) {
      /**
       * socket connect
       */
      console.log('all socket connect');
      StatusSocket.connect();
      ChatSocket.connect();
      GameSocket.connect();

      /**
       * alarm socket event
       */
      StatusSocket.on('alarms', saveNotificationList);
      StatusSocket.on('accept-friend', saveNotiResultList);
      StatusSocket.on('request-friend-from-user', saveNotificationList);

      return () => {
        StatusSocket.off('request-friend-from-user', saveNotificationList);
        StatusSocket.disconnect();
        ChatSocket.disconnect();
        GameSocket.disconnect();
      };
    }
  }, [userInfoObj, isLoggedIn]);

  useEffect(() => {
    if (
      isNotificationModalOpen &&
      notificationList.length > 0 &&
      prevNotificationList.current !== notificationList
    ) {
      const checkedAlarmList: CheckedAlarmDto[] = notificationList
        .filter((item) => !isUserDuplicated(item.requestId))
        .map((item) => ({ requestId: item.requestId }));

      StatusSocket.emit('checked-alarm', checkedAlarmList);
      prevNotificationList.current = notificationList;
    }
  }, [notificationList, isNotificationModalOpen, isLoggedIn]);

  /**
   * alarm socket event handler
   */
  const saveNotificationList = (
    data: ResponseNotificationDto[] | ResponseNotificationDto
  ) => {
    console.log('saveNotificationList called');
    const dataArray = Array.isArray(data) ? data : [data];
    if (dataArray.length === 0 || dataArray[0] === null) return;

    const filteredDataArray = dataArray.filter(
      (item) => item.isAccepted !== 'Y'
    );
    if (filteredDataArray.length === 0) return;

    console.log(dataArray);
    console.log(filteredDataArray);
    setNotificationList((prevList) => [...prevList, ...filteredDataArray]);
    setNotification(true);
  };

  const saveNotiResultList = (data: UserDto | UserDto[]) => {
    console.log('saveNoti Result List called');
    const dataArray = Array.isArray(data) ? data : [data];
    if (dataArray.length === 0) return;

    setFriendList((prevList) => [...prevList, ...dataArray]);

    console.log(dataArray);
    setNotiResultList((prevList) => [...prevList, ...dataArray]);
    setNotification(true);
  };

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
