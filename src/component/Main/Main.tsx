import { useRecoilValue } from 'recoil';
import { modalState } from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';
import { ChatRoom } from '../Chat/ChatRoom';

export const Main = () => {
	const isModalOpen = useRecoilValue(modalState);

	return (
		<>
		  <div className="h-screen p-10 bg-slate-100">
				<div className='grid grid-cols-3 grid-rows-5 gap-5 w-full h-[80vh] md:w-full md:h-[80vh]'>
					<div className="col-span-2 row-span-4 ">
						<ChatRoom />
					</div>
					<div className="col-span-1 row-span-5 bg-green-400">
						<h1>friend</h1>
					</div>
					<div className="col-span-2 bg-green-600">
						<h1>game</h1>
					</div>
				</div>
				{ isModalOpen && <ProfileModal /> }
			</div>
		</>
	)
}
