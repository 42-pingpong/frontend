import { ServiceTitle } from '../Main/ServiceTitle';
import { userInfo } from '../../atom/user';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { profileEditState } from '../../atom/profile';
import { UserDto } from '../../interfaces/User.dto';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';

export const MyProfile = ({ nickName }: { nickName: string | undefined }) => {
  const me = useRecoilValue(userInfo);
  const [user, setUser] = useState<UserDto>({
    id: 0,
    level: 0,
    nickName: '',
    fullName: '',
    email: '',
    selfIntroduction: '',
    status: '',
    profile: '',
  });
  const setProfileEdit = useSetRecoilState(profileEditState);

  useEffect(() => {
    if (nickName === undefined) {
      setUser(me);
    } else {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const res = await axiosInstance.get(`/user/search?nickName=${nickName}`);
    setUser(res.data[0]);
  };

  return (
    <div className="flex flex-col h-full min-w-max">
      <div className="flex">
        <ServiceTitle title="Profile" nonAddButton={true} />
      </div>
      <div className="flex flex-grow flex-col p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl">
        <div className="flex flex-row h-[25%] w-full items-center justify-center px-5 mt-3 bg-sky rounded-[3rem] shadow-lg">
          <div className="flex rounded-full border-borderBlue border-[6px] w-32 h-32 lg:w-40 lg:h-40">
            <img
              src={user.profile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex w-30 flex-grow flex-col h-full pl-2 justify-center ">
            <span className="w-full text-[2.8rem] font-bold text-center mb-3 text-gray-500">
              {user.nickName}
            </span>
          </div>
        </div>
        <div className="flex flex-grow flex-col mt-5 px-3">
          <div className="flex w-full flex-col items-start justify-center h-32 flex-grow">
            <span className="text-[1.2rem] font-bold text-center mb-3 text-borderBlue">
              name
            </span>
            <span className="text-[1.8rem] font-semibold text-center text-gray-500">
              {user.fullName}
            </span>
            <span className="text-[1rem] text-center text-gray-500">
              {user.email}
            </span>
          </div>
          <div className="flex flex-col w-full h-32 flex-grow-0 items-start">
            <span className="text-[1.2rem] font-bold text-center mb-3 text-borderBlue">
              intra level
            </span>
            <span className="text-[1.6rem] font-semibold text-center text-gray-500">
              {user.level}
            </span>
          </div>
          <div className="flex w-full h-32 flex-grow items-start flex-col">
            <span className="text-[1.2rem] font-bold text-center mb-3 text-borderBlue">
              introduction
            </span>
            <span className="text-[1rem] font-semibold text-gray-500">
              {user.selfIntroduction}
            </span>
          </div>
          <div className="flex w-full h-28 py-3 flex-grow-0">
            {nickName === undefined ? (
              <div
                className="flex w-full h-full justify-center items-center bg-progressBlue rounded-full shadow-xl"
                onClick={() => setProfileEdit(true)}
              >
                <span className="text-[2rem] font-semibold text-white">
                  Profile Edit
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
