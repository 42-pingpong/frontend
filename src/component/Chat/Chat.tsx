import React, { useEffect } from 'react';
import { ChatSection } from './ChatSection';
import { UserSection } from './User/UserSection';
import { useRecoilValue } from 'recoil';
import { profileModalState, notificationModalState } from '../../atom/modal';
import { NotificationModal } from '../Header/NotificationModal';
import { ProfileModal } from '../Header/ProfileModal';

export const Chat = () => {
  const isProfileModalOpen = useRecoilValue(profileModalState);
  const isNotificationModalOpen = useRecoilValue(notificationModalState);

  return (
    <div className="h-screen bg-slate-100 p-20 justify-center flex">
      <div className="pt-[2%] grid grid-cols-3 grid-rows-6 gap-20 w-full h-[80vh] max-w-[1800px]">
        <div className="col-span-2 row-span-6">
          <ChatSection />
        </div>
        <div className="col-span-1 row-span-6">
          <UserSection />
        </div>
      </div>
      {isProfileModalOpen && <ProfileModal />}
      {isNotificationModalOpen && <NotificationModal />}
    </div>
  );
};
