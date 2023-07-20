import { useRecoilValue } from 'recoil';
import { modalState } from '../../atom/modal';
import { ProfileModal } from '../Header/ProfileModal';

export const Main = () => {
	const isModalOpen = useRecoilValue(modalState);
	return (
		<>
		<div className="flex absolute w-full h-full bg-slate-100"></div>
		{ isModalOpen && <ProfileModal /> }
		</>
	)
}
