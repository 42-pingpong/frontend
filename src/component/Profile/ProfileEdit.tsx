import { useEffect, useRef, useState } from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userInfo } from '../../atom/user';
import { profileEditState } from '../../atom/profile';
import axiosInstance from '../../api/axios';
import { AuthenticationToggle } from './AuthenticationToggle';
import { AuthenticationModal } from './Authentication';

export const ProfileEdit = () => {
  const [user, setUser] = useRecoilState(userInfo);
  const [profileImage, setProfileImage] = useState(user.profile);
  const [formData, setFormData] = useState<FormData | null>(null);
  const setProfileEdit = useSetRecoilState(profileEditState);

  const nickNameRef = useRef(user.nickName);
  const selfIntroductionRef = useRef(user.selfIntroduction);
  const profileImageRef = useRef(user.profile);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit');

    try {
      if (formData?.get('image')) {
        const res = await axiosInstance.post('/upload', formData);
        profileImageRef.current = res.data.url;
      }
      if (
        nickNameRef.current !== user.nickName ||
        selfIntroductionRef.current !== user.selfIntroduction ||
        profileImageRef.current !== user.profile
      ) {
        const newProfile = {
          ...(profileImageRef.current !== user.profile && {
            profile: profileImageRef.current,
          }),
          ...(nickNameRef.current !== user.nickName && {
            nickName: nickNameRef.current,
          }),
          ...(selfIntroductionRef.current !== user.selfIntroduction && {
            selfIntroduction: selfIntroductionRef.current,
          }),
        };

        const res = await axiosInstance.patch(`/user/${user.id}`, newProfile);

        if (res.status === 200) {
          setUser((prevUser) => ({
            ...prevUser,
            nickName: nickNameRef.current,
            selfIntroduction: selfIntroductionRef.current,
            profile: profileImageRef.current,
          }));
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      if (error.response.status === 409) alert('이미 존재하는 닉네임입니다.');
    } finally {
      setProfileEdit(false);
    }
  };

  const handleChangeImageClick = () => {
    // fileInputRef의 클릭 이벤트를 발생시킴
    // 트리거 발생하면 handleImageChange 실행됨
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    try {
      // 이미지 미리보기
      reader.onload = () => {
        if (reader.result) setProfileImage(reader.result.toString());
      };

      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const newFormData = new FormData();

          newFormData.append('image', file);
          setFormData(newFormData);
        };
      } else {
        setProfileImage('');
      }
    } catch (error) {
      console.error('Error image load:', error);
    }
  };

  const inputChangeHandler = (event: any) => {
    const { name, value } = event.target;
    switch (name) {
      case 'nickName':
        nickNameRef.current = value;
        break;
      case 'selfIntroduction':
        selfIntroductionRef.current = value;
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-full min-w-max">
      <div className="flex">
        <ServiceTitle title="Profile" nonAddButton={true} />
      </div>
      <div className="flex flex-grow flex-col p-10 bg-white w-full h-60 rounded-[2rem] shadow-2xl">
        <form
          className="flex  flex-col h-full min-w-max"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row h-[25%] w-full items-center justify-center px-5 mt-3 bg-sky rounded-[3rem] shadow-lg">
            <div className="flex rounded-full border-borderBlue border-[6px] w-32 h-32 lg:w-40 lg:h-40">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="flex absolute ml-24 mt-20 w-20 h-20">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <img
                  src={require('../../public/camera.png')}
                  className="w-full"
                  onClick={handleChangeImageClick}
                  alt="Change Profile Photo"
                />
              </div>
            </div>
            <div className="flex w-full flex-col h-full pl-2 justify-center items-center">
              <input
                type="text"
                name="nickName"
                maxLength={10}
                placeholder={user.nickName}
                onChange={inputChangeHandler}
                className="w-full text-[2.8rem] font-semibold text-center mb-3 text-gray-500 border-none outline-none rounded-full"
              />
              <span className="text-gray-500 text-xl">
                메일로 로그인 2차인증 활성화하기
              </span>
              <AuthenticationToggle
                currentState={user.is2FAEnabled ? true : false}
              />
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
            <div className="flex w-full h-32 flex-grow items-start justify-start flex-col">
              <span className="text-[1.2rem] font-bold text-center mb-3 text-borderBlue">
                introduction
              </span>
              <textarea
                name="selfIntroduction"
                placeholder="최대 100자까지 입력 가능합니다."
                onChange={inputChangeHandler}
                maxLength={100}
                className="w-full h-full text-[1rem] font-semibold text-gray-500 border-none outline-none rounded-lg bg-slate-100 p-3"
                style={{ wordWrap: 'break-word', resize: 'none' }}
              />
            </div>
            <div className="flex w-full h-28 py-3 flex-grow-0">
              <button
                className="flex w-full h-full justify-center items-center bg-progressBlue rounded-full shadow-xl"
                type="submit"
              >
                <span className="text-[2rem] font-semibold text-white">
                  Submit
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
