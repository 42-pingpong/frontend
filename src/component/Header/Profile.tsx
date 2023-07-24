import { useCallback, useEffect, useState } from 'react';
import { ProfileModal } from './ProfileModal';
import { profileModalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';
import { loginState } from '../../atom/user';
import { useQuery } from 'react-query';
import axios from 'axios';

export const Profile = () => {
  // const URI = `${process.env.REACT_APP_SERVER}`
  const URI = `http://localhost:10002`
  const [isModalOpen, setIsModalOpen] = useRecoilState(profileModalState);
  const [isLogin, setIsLogin] = useRecoilState(loginState)

  // const getLogin = () => axios.get(URI + '/auth/42/login', {
  //   withCredentials: true,
  // });
  

  // const login = () => {
  //   console.log('login');
  //   const res = useQuery(['login'], getLogin, {
  //     onSuccess: (data) => {
  //       console.log(data);
  //       setIsLogin(true);
  //     }
  //   })}


  return (
    <>
      <img
        src={require('../../public/soo.png')}
        alt="Profile"
        className="w-14 rounded-full border-emerald-400 border-2"
        // onClick={() => {`${isLogin}` ? setIsModalOpen(!isModalOpen) : login}}
        
        onClick={() => window.location.href=URI + '/api/auth/42/login'}
      />
    </>
  );
};
