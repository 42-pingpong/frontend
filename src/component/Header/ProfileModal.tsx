import { useRecoilState } from 'recoil';
import { modalState } from '../../atom/modal';

export const ProfileModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('modal-content');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (
      modalContent &&
      modalContent.contains(e.target) &&
      e.target !== modalCloseButton
    )
      e.stopPropagation();
    else setIsModalOpen(!isModalOpen);
  };

  return (
    //fixed : viewport를 기준으로 한다. (조상의 position에 영향을 받지 않고 화면 전체를 기준으로 한다)
    // 그래서.. 스크롤을 내려도 고정된다..
    <div
      aria-hidden={true}
      className="fixed inset-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      onClick={closeModal}
    >
      <div
        id="modal-content"
        className="relative flex flex-col float-right bg-white rounded-3xl w-80 h-72 mt-20 shadow-lg items-center justify-center"
      >
        <div className="flex relative bg-slate-100 w-72 h-36 mb-3 rounded-3xl shadow-xl ">
          <div className="flex absolute w-1/3 h-full left-0">
            <img
              src={require('../../public/soo.png')}
              alt="Profile"
              className="absolute w-11/12 rounded-full border-emerald-400 border-4 m-3"
            />
          </div>
          <div className="absolute content-around w-3/5 h-full right-0">
            <div className=" mt-6 w-full pr-2">
              <span className=" text-xl font-semibold text-gray-600">
                IntraId
              </span>
            </div>
            <div className="absolute mt-[-1vh] w-full pr-2">
              <span className=" text-[0.45rem] font-bold text-gray-600">
                IntraId@42student.seoul.kr
              </span>
            </div>
            <div className="absolute h-1/2 w-full bottom-0 pr-2 pb-2">
              <p className="text-gray-600 text-start text-[0.7rem] leading-[0.85rem]">
                안녕하세요 수예요 이거만 하고 잘까 생각중입니다.
                상태메세지입니다. 오늘 탕후루를 먹었어요. 맛있더라고요
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative bg-slate-100 mt-1 w-72 h-12 rounded-3xl shadow-xl justify-center items-center">
          <span className=" text-lg font-semibold text-gray-600">
            {' '}
            Profile{' '}
          </span>
        </div>
        <div className="absolute bottom-3 right-5 text-gray-400 text-sm ">
          로그아웃
        </div>
        <button
          id="modal-close-button"
          className="absolute top-2 right-3 p-0 text-gray-400 text-lg"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </div>
  );
};
