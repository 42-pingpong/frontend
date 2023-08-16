import React, { useEffect } from 'react';
import { ChatSection } from './ChatSection';
import { UserSection } from './User/UserSection';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  profileModalState,
  notificationModalState,
  muteModalState,
} from '../../atom/modal';
import { NotificationModal } from '../Header/NotificationModal';
import { ProfileModal } from '../Header/ProfileModal';
import { currentChatInfoState, roleState } from '../../atom/chat';
import { userInfo } from '../../atom/user';
import { MuteTimeModal } from './inChatModal/MuteTimeModal';

export const Chat = () => {
  const isProfileModalOpen = useRecoilValue(profileModalState);
  const isNotificationModalOpen = useRecoilValue(notificationModalState);
  const isMuteModalOpen = useRecoilValue(muteModalState);
  const [role, setRole] = useRecoilState(roleState);
  const roomInfo = useRecoilValue(currentChatInfoState);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    console.log(roomInfo);
    setRole(
      roomInfo.ownerId === user.id
        ? 'owner'
        : roomInfo.admin.find((item: any) => item.id === user.id)
        ? 'admin'
        : 'user'
    );
  }, [roomInfo]);

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
      {isMuteModalOpen && <MuteTimeModal />}
      {}
    </div>
  );
};
