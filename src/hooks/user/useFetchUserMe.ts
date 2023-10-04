import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/user';
import axiosInstance from '../../api/axios';
import { UserDto } from '../../interfaces/User.dto';

export default function useFetchUserMe() {
  const setUser = useSetRecoilState(userInfo);
  const token = localStorage.getItem('token');
  const [login, setLogin] = useRecoilState(loginState);

  const fetchUser = async () => {
    const res = await axiosInstance.get<UserDto>('/user/me');
    console.log(res.data);

    setLogin(true);
    setUser(res.data);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return login;
}
