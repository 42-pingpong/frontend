import React from 'react';
import { MyProfile } from './MyProfile';
import { GameHistory } from './GameHistory';
import { useRecoilValue } from 'recoil';
import { profileModalState } from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';
import { useParams } from 'react-router-dom';
import { profileEditState } from '../../atom/profile';
import { ProfileEdit } from './ProfileEdit';

export const Profile = () => {
  const isProfileModalOpen = useRecoilValue(profileModalState);
  const profileEdit = useRecoilValue(profileEditState);
  const params = useParams();
  const nickName =
    params.nickName?.[0] === ':' ? params.nickName?.slice(1) : params.nickName;

  return (
    <div className="flex h-screen p-32 items-center justify-center">
      <div className="grid grid-cols-1 2xl:grid-cols-5 gap-x-32 h-full max-w-[1800px] w-screen">
        <div className="2xl:col-span-2 min-h-[800px]">
          {profileEdit && params.nickName === undefined ? (
            <ProfileEdit />
          ) : (
            <MyProfile nickName={nickName} />
          )}
        </div>
        <div className="2xl:col-span-3 min-h-[800px]">
          <GameHistory nickName={nickName} />
        </div>
      </div>
      {isProfileModalOpen && <ProfileModal />}
    </div>
  );
};
