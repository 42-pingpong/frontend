import { useRecoilState } from 'recoil';
import { notificationModalState } from '../../atom/modal';
import { RequestFriend } from '../FriendList/RequestFriend';
import './styles.css';
import { notificationState } from '../../atom/notification';
import { ResponseNotificationDto } from '../../interfaces/Request-Friend.dto';
import { useEffect } from 'react';

// const requestingUser = {
//   id: 12345,
//   nickName: 'soobal',
// };

// const list: ResponseNotificationDto[] = [
//   {
//     requestId: 1,
//     requestingUser: requestingUser,
//     requestType: 'F',
//     isAccepted: 'P',
//     createdAt: '2023-08-04T07:33:34.662Z',
//     pastTime: '1시간 전',
//   },
//   {
//     requestId: 2,
//     requestingUser: requestingUser,
//     requestType: 'G',
//     isAccepted: 'P',
//     createdAt: '2023-08-04T06:33:34.662Z',
//     pastTime: '2시간 전',
//   },
//   {
//     requestId: 3,
//     requestingUser: requestingUser,
//     requestType: 'C',
//     isAccepted: 'P',
//     createdAt: '2023-08-04T05:33:34.662Z',
//     pastTime: '3시간 전',
//   },
// ];

export const NotificationModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(notificationModalState);
  const [notificationList, setNotificationList] =
    useRecoilState(notificationState);

  // useEffect(() => {
  //   setNotificationList(list);
  // }, []);

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
        className="relative flex flex-col float-right bg-white rounded-3xl w-[25rem] h-[31vh] mt-20 mr-20 p-8 items-center justify-center shadow-lg shadow-gray-300"
      >
        <div className="flex flex-col w-full h-full overflow-y-auto py-3">
          {notificationList.map((item) => (
            <RequestFriend key={item.requestId} props={item} />
          ))}
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
