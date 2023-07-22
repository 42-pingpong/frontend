import { useRecoilValue } from 'recoil';
import { modalState } from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';
import { ChatRoom } from '../ChatList/ChatRoom';
import { UserList } from '../UserList/UserList';
import { GameMatch } from '../GameMatch/GameMatch';

export const Main = () => {
	const isModalOpen = useRecoilValue(modalState);

	return (
		<>
		  <div className="h-screen p-10 bg-slate-100">
				<div className='grid grid-cols-3 grid-rows-6 gap-10 w-full h-[80vh] md:w-full md:h-[80vh]'>
					<div className="col-span-2 row-span-4 ">
						<ChatRoom />
					</div>
					<div className="col-span-1 row-span-6 bg-green-400">
						<UserList />
					</div>
					<div className="col-span-2 row-span-2 bg-green-600">
						<GameMatch />
					</div>
				</div>
				{ isModalOpen && <ProfileModal /> }
			</div>
		</>
	)
}
