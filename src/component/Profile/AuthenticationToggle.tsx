import { useState } from 'react';

export const AuthenticationToggle = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const toggleHandler = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
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
  );
};
