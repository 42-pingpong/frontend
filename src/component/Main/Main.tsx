import { useRecoilValue } from 'recoil';
import { modalState } from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';

export const Main = () => {
	const isModalOpen = useRecoilValue(modalState);
	return (
		<>
		<div className="relative w-full h-screen bg-slate-100"></div>
		{ isModalOpen && <ProfileModal /> }
		</>
	)
}
