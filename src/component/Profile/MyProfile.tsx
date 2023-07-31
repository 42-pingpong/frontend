import React from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';
import { userInfo } from '../../atom/user';
import { useRecoilState } from 'recoil';

export const MyProfile = () => {
  const [userInfoObj, setUserInfo] = useRecoilState(userInfo);

  return (
    <div className="flex flex-col h-full min-w-max">
      <div className="flex">
        <ServiceTitle title="Profile" nonAddButton={true} />
      </div>
      <div className="flex flex-grow flex-col p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl">
        <div className="flex flex-row h-[25%] w-full">
          <div className="flex rounded-full border-borderBlue border-[6px] w-32 h-32 lg:w-40 lg:h-40">
            <img
              src={userInfoObj.profile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};
