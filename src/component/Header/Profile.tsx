import { useCallback, useEffect, useState } from 'react';
import { ProfileModal } from './ProfileModal';
import { profileModalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';
import { loginState } from '../../atom/user';
import { useQuery } from 'react-query';
import axios from 'axios';

export const Profile = () => {
  const URI = `${process.env.REACT_PORT}`
  console.log(URI);
  const [isModalOpen, setIsModalOpen] = useRecoilState(profileModalState);
  const [isLogin, setIsLogin] = useRecoilState(loginState)

  // const getLogin = axios.get('http://localhost:4000/auth/login', {
  //   withCredentials: true,
  // });
  

  // const login = useCallback(() => {
  //   const res = useQuery(['login'], )
  // }, []);

  return (
    <>
      <img
        src={require('../../public/soo.png')}
        alt="Profile"
        className="w-14 rounded-full border-emerald-400 border-2"
        onClick={() => {`${isLogin}` ? setIsModalOpen(!isModalOpen) : null}}
      />
    </>
  );
};
