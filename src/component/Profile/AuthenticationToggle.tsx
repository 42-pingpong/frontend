import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import axiosInstance from '../../api/axios';
import { userInfo } from '../../atom/user';

export const AuthenticationToggle = (props: { currentState: boolean }) => {
  const [isToggleOn, setIsToggleOn] = useState(props.currentState);
  const [error, setError] = useState('');
  const user = useRecoilValue(userInfo);

  const toggleHandler = async () => {
    setIsToggleOn(!isToggleOn);
    try {
      await axiosInstance.patch(`/user/${user.id}`, {
        is2FAEnabled: !isToggleOn,
      });
    } catch (error) {
      setError('Something went wrong');
    }
  };
  return (
    <div>
      <div
        className={`toggle-container w-20 h-10 rounded-3xl  transition-all cursor-pointer hover:bg-[#BDBDBD] active:bg-[#828282] duration-30 ${
          isToggleOn ? 'bg-progressBlue' : 'bg-[#BDBDBD]'
        }`}
        onClick={toggleHandler}
      >
        <div
          className={`toggle-button w-10 h-10 rounded-3xl bg-white transition-transform ${
            isToggleOn ? 'translate-x-10' : 'translate-x-0'
          }`}
        ></div>
      </div>
      <div className={`w-5 h-5`}>{error}</div>
    </div>
  );
};
