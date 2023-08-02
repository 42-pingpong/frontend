import { notificationModalState, profileModalState } from '../../atom/modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { useEffect, useState } from 'react';
import React from 'react';
import { RequestFriendFromUserDto } from '../../interfaces/Request-Friend.dto';

const Profile = () => {
  const userInfoObj = useRecoilValue(userInfo);
  const [isProfileModalOpen, setIsProfileModalOpen] =
    useRecoilState(profileModalState);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useRecoilState(
    notificationModalState
  );
  const isLoggedIn = useRecoilValue(loginState);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('connect');
      StatusSocket.connect();

      return () => {
        StatusSocket.disconnect();
      };
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log('머고');
    StatusSocket.on(
      'request-friend-from-user',
      (data: RequestFriendFromUserDto) => {
        console.log('request-friend-from-user socket on');
        //전달받은 data저장해야됨
        console.log(data);
      }
    );
    setNotification(true);
  }, [StatusSocket]);

  return (
    <div className=" flex flex-row justify-center items-center">
      <div
        className="w-14 h-10 justify-start items-center flex"
        onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
      >
        <div className="w-5 h-5 rounded-full bg-borderBlue"></div>
      </div>
      {/* {notification && (
          <div className=" flex flex-row justify-center items-center">
        <div className="bg-red-300 w-10 h-10 justify-start items-center flex">
          <div className="w-5 h-5 rounded-full bg-borderBlue"></div>
        </div>
        )} */}
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
