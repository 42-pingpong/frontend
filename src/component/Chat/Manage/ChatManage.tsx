import { useEffect } from 'react';
import { MuteList } from './MuteList';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { userInfo } from '../../../atom/user';
import { RoomInfo } from './RoomInfo';
import { BanList } from './BanList';
import useUnBan from '../../../hooks/chat/useUnBan';
import useUnMute from '../../../hooks/chat/useUnMute';
import { useSetRole } from '../../../hooks/chat/useSetRole';
import useFetchChatManageInfo from '../../../hooks/chat/useFetchChatManageInfo';
import { UserList } from './UserList';
import { NotificationModal } from '../../Header/NotificationModal';
import { ProfileModal } from '../../Header/ProfileModal';
import { notificationModalState, profileModalState } from '../../../atom/modal';

export const ChatManage = () => {
  const roomId = useParams().roomId;
  const user = useRecoilValue(userInfo);
  const role = useSetRole();
  const { banList, setBanList } = useUnBan();
  const { muteList, setMuteList } = useUnMute();
  const roomInfo = useFetchChatManageInfo(
    Number(roomId),
    setBanList,
    setMuteList
  );
  const isNotificationModalOpen = useRecoilValue(notificationModalState);
  const isProfileModalOpen = useRecoilValue(profileModalState);

  useEffect(() => {
    if (roomInfo === undefined || user.id === -1) return;
    if (role === 'user') {
      alert('권한이 없습니다.');
      window.history.back();
    }
  }, [roomInfo]);

  return (
    <div className="flex h-screen w-full bg-slate-200 pb-20 pt-10 px-16 justify-center items-center">
      <section className="flex flex-col h-full w-full max-w-[1800px]">
        <div className="flex w-full h-[20vh] items-center mb-5">
          <RoomInfo role={role} roomInfo={roomInfo} />
        </div>
        <div className="grid w-full h-full grid-cols-1 xl:grid-cols-3 gap-10">
          <div className="flex w-full justify-center">
            <UserList
              owner={roomInfo.owner}
              admin={roomInfo.admin}
              joinedUser={roomInfo.joinedUser}
            />
          </div>
          <div className="flex w-full justify-center">
            <MuteList list={muteList} roomId={roomId as string} />
          </div>
          <div className="flex w-full justify-center">
            <BanList list={banList} roomId={roomId as string} />
          </div>
        </div>
      </section>
      {isProfileModalOpen && <ProfileModal />}
      {isNotificationModalOpen && <NotificationModal />}
    </div>
  );
};
