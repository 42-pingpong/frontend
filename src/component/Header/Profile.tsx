import { profileModalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/user';
import { StatusSocket } from '../../sockets/StatusSocket';
import { useEffect } from 'react';
import React from 'react';
import {
  addSocketListener,
  handleFriendRequest,
} from '../../sockets/StatusSocketEvents';

const Profile = () => {
  const [userInfoObj, setUserInfoObj] = useRecoilState(userInfo);
  const [isModalOpen, setIsModalOpen] = useRecoilState(profileModalState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('connect');
      StatusSocket.connect();
      addSocketListener('friend-request', handleFriendRequest);

      return () => {
        StatusSocket.disconnect();
      };
    }
  }, [isLoggedIn]);

  return (
    <>
      <img
        src={userInfoObj.profile}
        alt="Profile"
        className="w-14 h-14 object-cover rounded-full border-borderBlue border-2"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default Profile;
