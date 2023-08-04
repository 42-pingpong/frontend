import { useRecoilState } from 'recoil';
import { notificationModalState } from '../../atom/modal';
import { RequestFriend } from '../FriendList/RequestFriend';
import './styles.css';

export const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(notificationModalState);

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('notification-modal-content');
    const modalCloseButton = document.getElementById('noti-modal-close-button');

    if (
      modalContent &&
      modalContent.contains(e.target) &&
      e.target !== modalCloseButton
    )
      e.stopPropagation();
    else setIsModalOpen(!isModalOpen);
  };

  return (
    <div aria-hidden={true} className="background" onClick={closeModal}>
      <div
        id="notification-modal-content"
        className="relative flex flex-col float-right bg-white rounded-3xl w-[20rem] h-[30vh] mt-20 mr-20 p-8 items-center justify-center shadow-lg shadow-gray-300"
      >
        <div className="flex flex-col w-full h-full overflow-y-auto py-3">
          {/* {data.map((item) => (
            <RequestFriend key={item.id} props={item} />
          ))} */}
        </div>
        <div className="absolute top-3 right-5 p-0  text-gray-400 text-lg">
          <button id="noti-modal-close-button" onClick={closeModal}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};
