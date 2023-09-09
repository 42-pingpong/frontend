import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/user';
import Login from './Login';
import Profile from './Profile';
import axios from 'axios';
import { UserDto } from '../../interfaces/User.dto';
import axiosInstance from '../../api/axios';

const SERVER = process.env.REACT_APP_SERVER;

const ConditionalProfileDisplay = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const setUserInfo = useSetRecoilState(userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoggedIn && !localStorage.getItem('token')) return;
        const res = await axiosInstance.get<UserDto>(`/user/me`);
        const userData = res.data;
        console.log('userDataCalled');

        if (userData.id !== undefined) {
          setIsLoggedIn(true);
          setUserInfo(userData);
        }
      } catch (error) {
        console.log('error');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center mr-3">
      {isLoggedIn ? <Profile /> : <Login />}
    </div>
  );
};

export default ConditionalProfileDisplay;
