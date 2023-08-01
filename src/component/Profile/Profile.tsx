import React from 'react';
import { MyProfile } from './MyProfile';
import { GameHistory } from './GameHistory';
import { useRecoilValue } from 'recoil';
import { profileModalState } from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';

export const Profile = () => {
  const isProfileModalOpen = useRecoilValue(profileModalState);

  return (
    <div className="flex h-screen p-32 items-center justify-center">
      <div className="grid  grid-cols-1 lg:grid-cols-5 gap-x-32 h-full max-w-[1800px] w-screen">
        <div className="lg:col-span-2">
          <MyProfile />
        </div>
        <div className="lg:col-span-3">
          <GameHistory />
        </div>
      </div>
      {isProfileModalOpen && <ProfileModal />}
    </div>
  );
};
