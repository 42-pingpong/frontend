import { notificationModalState, profileModalState } from '../../atom/modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { useEffect, useState } from 'react';
import { notificationState } from '../../atom/notification';
import { ResponseNotificationDto } from '../../interfaces/Request-Friend.dto';

const Profile = () => {
  const userInfoObj = useRecoilValue(userInfo);
  const isLoggedIn = useRecoilValue(loginState);
  const setNotificationList = useSetRecoilState(notificationState);
  const [notification, setNotification] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] =
    useRecoilState(profileModalState);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useRecoilState(
    notificationModalState
  );

  useEffect(() => {
    if (isLoggedIn) {
      //test용 나중에 지워라
      setNotification(true);

      const saveNotificationList = (data: ResponseNotificationDto[]) => {
        console.log('request-friend-from-user');
        console.log(data);
        setNotificationList(data);
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
