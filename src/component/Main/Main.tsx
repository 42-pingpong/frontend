import { useRecoilValue } from 'recoil';
import {
  addUserModalState,
  chattingModalState,
  profileModalState,
} from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';
import { ChatRoom } from '../ChatList/ChatRoom';
import { UserList } from '../UserList/UserList';
import { GameMatch } from '../GameMatch/GameMatch';
import { ChattingRoom } from '../ChattingRoom/ChattingRoom';
import { AddUser } from '../UserList/AddUser';

export const Main = () => {
  const isProfileModalOpen = useRecoilValue(profileModalState);
  const isChattingModalOpen = useRecoilValue(chattingModalState);
  const isAddUserModalOpen = useRecoilValue(addUserModalState);

  return (
    <>
      <div className="h-screen bg-slate-100 py-14 px-32">
        <div className="grid grid-cols-3 grid-rows-5 gap-x-24 gap-y-10 w-full h-[80vh] md:w-full md:h-[80vh]">
          <div className="col-span-2 row-span-4 ">
            <ChatRoom />
          </div>
          <div className="row-span-5">
            <UserList />
          </div>
          <div className="col-span-2">
            <GameMatch />
          </div>
        </div>
        {isProfileModalOpen && <ProfileModal />}
        {isChattingModalOpen && <ChattingRoom />}
        {isAddUserModalOpen && <AddUser />}
      </div>
    </>
  );
};
