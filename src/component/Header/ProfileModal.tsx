import { useRecoilState } from "recoil";
import { modalState } from "../../atom/modal";

export const ProfileModal = ({ openModal = function() {} }) => {
	const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
	
	return (
		//fixed : viewport를 기준으로 한다. (조상의 position에 영향을 받지 않고 화면 전체를 기준으로 한다)
		// 그래서.. 스크롤을 내려도 고정된다..
		<div aria-hidden={true}
				 className="fixed inset-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
				 onClick={() => setIsModalOpen(!isModalOpen)}>
			<div className="relative flex flex-col float-right bg-blue-200 rounded-3xl w-80 h-64 mt-24 shadow-lg items-center justify-center">
				<div className="flex bg-purple-600 w-full h-48">
					<img src={require('../../public/soo.png')} 
							alt="Profile" 
							className="absolute w-24 rounded-full border-emerald-400 border-2 m-5" />
				</div>
				<div className="flex bg-green-600 w-80 h-12">
				</div>
				<button className="absolute top-0 right-0 p-4" 
								onClick={() => setIsModalOpen(!isModalOpen)}>
					X
				</button>
			</div>
		</div>
	)
}
