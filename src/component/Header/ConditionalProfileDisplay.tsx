import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/login';
import Login from './Login';
import Profile from './Profile';
import { useQuery } from 'react-query';
import axios from 'axios';

const SERVER = process.env.REACT_APP_SERVER;

const ConditionalProfileDisplay = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [, setUserInfo] = useRecoilState(userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(SERVER + `/api/user/me`, {
          withCredentials: true,
        });
        console.log(res);

        const userData = res.data;

        if (userData.id !== undefined) {
          setIsLoggedIn(true);
          setUserInfo(userData);
          console.log(userData);
        }
      } catch (error) {
        console.log('error');
      }
    };
    fetchData();
  }, [isLoggedIn]);

  return (
    <div className="flex items-center mr-3">
      {isLoggedIn ? <Profile /> : <Login />}
    </div>
  );
};

export default ConditionalProfileDisplay;
