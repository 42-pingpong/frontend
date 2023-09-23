import { useRecoilValue } from 'recoil';
import {
  addUserModalState,
  chattingModalState,
  gameModeModalState,
  notificationModalState,
  profileModalState,
} from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';
import { ChatRoom } from '../Chat/ChatList/ChatRoom';
import { GameMatch } from '../Game/GameMatch/GameMatch';
import { CreateChattingRoomModal } from '../Chat/CreateChattingRoomModal/CreateChattingRoomModal';
import { AddFriendModal } from '../FriendList/AddFriendModal';
import { FriendList } from '../FriendList/FriendList';
import { NotificationModal } from '../Header/NotificationModal';
import { ResetGameRecoilStatus } from '../Game/ResetGameRecoilStatus';
import { GameModeModal } from '../Game/GameModeModal';

export const Main = () => {
  const isProfileModalOpen = useRecoilValue(profileModalState);
  const isChattingModalOpen = useRecoilValue(chattingModalState);
  const isAddUserModalOpen = useRecoilValue(addUserModalState);
  const isNotificationModalOpen = useRecoilValue(notificationModalState);

  const isGameModeModalOpen = useRecoilValue(gameModeModalState);


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
      {isGameModeModalOpen && <GameModeModal />}
      {<ResetGameRecoilStatus />}
    </div>
  );
};
