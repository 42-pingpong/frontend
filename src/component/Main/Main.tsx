import { useRecoilValue } from 'recoil';
import { chattingModalState, profileModalState } from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';
import { ChatRoom } from '../ChatList/ChatRoom';
import { UserList } from '../UserList/UserList';
import { GameMatch } from '../GameMatch/GameMatch';
import { ChattingRoom } from '../ChattingRoom/ChattingRoom';

export const Main = () => {
  const isProfileModalOpen = useRecoilValue(profileModalState);
  const isChattingModalOpen = useRecoilValue(chattingModalState);

  return (
    <div className="flex py-14 px-32 items-center justify-center">
      <div className="grid grid-row-3 xl:grid-cols-3 xl:grid-rows-6 h-full gap-10  max-w-[1800px] w-[100vw]">
        <div className=" h-96 xl:h-full row-span-1 xl:col-span-2 xl:row-span-4">
          <ChatRoom />
        </div>
        <div className="h-96 xl:h-full row-span-1 xl:row-span-6">
          <UserList />
        </div>
        <div className="h-48 xl:h-full row-span-1 xl:row-span-2 xl:col-span-2">
          <GameMatch />
        </div>
      </div>
      {isProfileModalOpen && <ProfileModal />}
      {isChattingModalOpen && <ChattingRoom />}
    </div>
  );
};
