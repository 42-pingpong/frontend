import { useRecoilState } from 'recoil';
import { notificationModalState } from '../../atom/modal';
import { RequestFriend } from '../FriendList/RequestFriend';
import './styles.css';
import { notiResponseState, notificationState } from '../../atom/notification';
import { ResponseFriend } from '../FriendList/ResponseFriend';
import { closeModal } from '../../utils/modalClose';

export const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(notificationModalState);
  const [notificationList, setNotificationList] =
    useRecoilState(notificationState);
  const [notificationResultList, setNotificationResultList] =
    useRecoilState(notiResponseState);

  return (
    <div
      aria-hidden={true}
      className="background z-50"
      onClick={() => closeModal(isModalOpen, setIsModalOpen)}
    >
      <div
        id="notification-modal-content"
        className="relative flex flex-col float-right bg-white rounded-3xl w-[25rem] h-[31vh] mt-20 mr-20 p-8 items-center justify-center shadow-lg shadow-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col w-full h-full overflow-y-auto py-3">
          {notificationList?.map((item) => (
            <RequestFriend key={item.requestId} props={item} />
          ))}
          {notificationResultList?.map((item) => (
            <ResponseFriend key={item.id} props={item} />
          ))}
        </div>
        <div className="absolute top-3 right-5 p-0  text-gray-400 text-lg">
          <button
            id="noti-modal-close-button"
            onClick={() => closeModal(isModalOpen, setIsModalOpen)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};
