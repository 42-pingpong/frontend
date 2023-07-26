import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState, userInfo } from '../../atom/login';
import Login from './Login';
import Profile from './Profile';

const ConditionalProfileDisplay = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [userInfoObject, setUserInfo] = useRecoilState(userInfo);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('http://localhost:10002/api/user/me', {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.id !== undefined) {
        setIsLoggedIn(true);
        setUserInfo(data);
        console.log(data);
      }
    };
    fetchUser();
  }, [isLoggedIn]);

  return (
    <div className="flex items-center mr-3">
      {isLoggedIn ? <Profile /> : <Login />}
    </div>
  );
};

export default ConditionalProfileDisplay;
