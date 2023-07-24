import { useRecoilState } from 'recoil';
import { modalState } from '../../atom/modal';
import './styles.css'

export const ProfileModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

	const closeModal = (e: any) => {
		const modalContent = document.getElementById('modal-content');
		const modalCloseButton = document.getElementById('modal-close-button');

		if (modalContent && modalContent.contains(e.target) && e.target !== modalCloseButton)
			e.stopPropagation();
		else 
			setIsModalOpen(!isModalOpen);
	};

	return (
		//fixed : viewport를 기준으로 한다. (조상의 position에 영향을 받지 않고 화면 전체를 기준으로 한다)
		// 그래서.. 스크롤을 내려도 고정된다..
		<div aria-hidden={true}
				 className="background"
				 onClick={closeModal}>
			<div id="modal-content" 
						className="relative flex flex-col float-right bg-white rounded-3xl w-[28rem] h-[24rem] mt-20  items-center justify-center shadow-lg shadow-gray-300">
				<div className="profile-container">
					<div className="profile-image-container">
					<img src={require('../../public/soo.png')} 
								alt="Profile" 
								className="absolute w-11/12 rounded-full border-4 m-3 border-emerald-400 " />
					</div>
					<div className="profile-content-container">
						<div className="profile-name-container">
							<span className="profile-name">IntraId</span>
						</div>
						<div className="profile-email-container">
							<span className="profile-email">IntraId@42student.seoul.kr</span>
						</div>
						<div className="profile-massege-container">
							<p className="profile-massege">안녕하세요 수예요 이거만 하고 잘까 생각중입니다. 상태메세지입니다. 오늘 탕후루를 먹었어요. 맛있더라고요</p>
						</div>
					</div>
				</div>
				<div className="profile-button-container">
					<span className="profile-button-text"> Profile </span>
				</div>
				<div className="logout">
					로그아웃
				</div>
				<div className="close-button">
				<button id="modal-close-button" 
								onClick={closeModal}>
					X
				</button>
				</div>
			</div>
		</div>
	)
}
