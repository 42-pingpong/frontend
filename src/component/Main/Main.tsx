import { useRecoilValue } from 'recoil';
import {
  addUserModalState,
  chattingModalState,
  clickedFriendProfileState,
  clickedRoomIdState,
  clickedXState,
  clickedYState,
  friendProfileModalState,
  notificationModalState,
  passwordModalState,
  profileModalState,
} from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';
import { ChatRoom } from '../Chat/ChatList/ChatRoom';
import { GameMatch } from '../Game/GameMatch/GameMatch';
import { CreateChattingRoomModal } from '../Chat/CreateChattingRoomModal';
import { AddFriendModal } from '../FriendList/AddFriendModal';
import { FriendList } from '../FriendList/FriendList';
import { FriendProfileModal } from '../FriendList/FriendProfileModal';
import { NotificationModal } from '../Header/NotificationModal';
import { PasswordModal } from '../Chat/ChatList/PasswordModal';

export const Main = () => {
  const isProfileModalOpen = useRecoilValue(profileModalState);
  const isChattingModalOpen = useRecoilValue(chattingModalState);
  const isAddUserModalOpen = useRecoilValue(addUserModalState);
  const isFirendProfileModalOpen = useRecoilValue(friendProfileModalState);
  const isNotificationModalOpen = useRecoilValue(notificationModalState);
  const isPasswordModalOpen = useRecoilValue(passwordModalState);
  const clickedX = useRecoilValue(clickedXState);
  const clickedY = useRecoilValue(clickedYState);
  const clickedFriendProfile = useRecoilValue(clickedFriendProfileState);
  const clickedRoomId = useRecoilValue(clickedRoomIdState);

  return (
    <div className="flex p-32 items-center justify-center h-screen">
      <div className="grid grid-row-3 xl:grid-cols-3 xl:grid-rows-5 h-full gap-x-20 gap-y-10 max-w-[1800px] w-[100vw]">
        <div className="h-96 xl:h-full row-span-1 xl:col-span-2 xl:row-span-4">
          <ChatRoom />
        </div>
        <div className="h-96 xl:h-full row-span-1 xl:row-span-5">
          <FriendList />
        </div>
        <div className="h-48 xl:h-full row-span-1 xl:col-span-2">
          <GameMatch />
        </div>
      </div>
      {isProfileModalOpen && <ProfileModal />}
      {isNotificationModalOpen && <NotificationModal />}
      {isChattingModalOpen && <CreateChattingRoomModal />}
      {isAddUserModalOpen && <AddFriendModal />}
      {isFirendProfileModalOpen && (
        <FriendProfileModal
          user={clickedFriendProfile}
          x={clickedX}
          y={clickedY}
        />
      )}
      {isPasswordModalOpen && <PasswordModal roomId={clickedRoomId} />}
    </div>
  );
};
