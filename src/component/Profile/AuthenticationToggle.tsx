import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfo } from '../../atom/user';
import axiosInstance from '../../api/axios';

export const AuthenticationToggle = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [isToggleOn, setIsToggleOn] = useState(user.is2FAEnabled);

  const toggleHandler = () => {
    setIsToggleOn(!isToggleOn);
  };

  useEffect(() => {
    // 아직 api 없음
    // const res = axiosInstance.patch(`/user/2FAEnable/${user.id}`, isToggleOn);
    // if (res.status === 200) {

    // user set을 다시 해버리면 소켓도 다시 연결됨 !..
    setUser((prevUser) => ({
      ...prevUser,
      is2FAEnabled: isToggleOn,
    }));
    // }
  }, [isToggleOn]);

  return (
    <div
      className={`toggle-container w-20 h-10 rounded-full transition-all cursor-pointer hover:bg-[#87C2CD] active:bg-[#828282] duration-30 shadow-lg ${
        isToggleOn ? 'bg-progressBlue' : 'bg-[#BDBDBD]'
      }`}
      onClick={toggleHandler}
    >
      <div
        className={`toggle-button w-8 h-8 mt-1 rounded-full bg-white transition-transform  ${
          isToggleOn ? 'translate-x-10' : 'translate-x-2'
        }`}
      ></div>
    </div>
  );
};
