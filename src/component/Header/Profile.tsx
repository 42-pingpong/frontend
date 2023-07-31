import { profileModalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/login';
import { StatusSocket } from '../../sockets/StatusSocket';
import { useEffect } from 'react';
import React from 'react';

const Profile = () => {
  const [userInfoObj, setUserInfoObj] = useRecoilState(userInfo);
  const [isModalOpen, setIsModalOpen] = useRecoilState(profileModalState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('connect');
      StatusSocket.connect();

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
        className="w-14 h-14 object-cover rounded-full border-emerald-400 border-2"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default Profile;
