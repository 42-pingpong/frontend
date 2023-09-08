import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileModalState } from '../../atom/modal';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../atom/user';
import Logout from './Logout';
import './styles.css';
import { profileEditState } from '../../atom/profile';

export const ProfileModal = () => {
  const navigation = useNavigate();
  const [isModalOpen, setIsModalOpen] = useRecoilState(profileModalState);
  const [userInfoObj, setUserInfoObj] = useRecoilState(userInfo);
  const setProfileEdit = useSetRecoilState(profileEditState);

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

  const navigateToProfile = () => {
    navigation('/profile');
    setIsModalOpen(!isModalOpen);
    setProfileEdit(false);
  };

  return (
    //fixed : viewport를 기준으로 한다. (조상의 position에 영향을 받지 않고 화면 전체를 기준으로 한다)
    // 그래서.. 스크롤을 내려도 고정된다..
    <div aria-hidden={true} className="background" onClick={closeModal}>
      <div
        id="modal-content"
        className="relative flex flex-col float-right bg-white rounded-3xl w-[28rem] h-[24rem] mt-20  items-center justify-center shadow-lg shadow-gray-300"
      >
        <div className="profile-container">
          <div className="profile-image-container">
            <img
              src={userInfoObj.profile}
              alt="Profile"
              className="absolute w-[7.5rem] h-[7.5rem] rounded-full border-4 m-3 border-borderBlue object-cover"
            />
          </div>
          <div className="profile-content-container">
            <div className="profile-name-container">
              <span className="profile-name">{userInfoObj.nickName}</span>
            </div>
            <div className="profile-email-container">
              <span className="profile-email">{userInfoObj.email}</span>
            </div>
            <div className="profile-massege-container">
              <p className="profile-massege">{userInfoObj.selfIntroduction}</p>
            </div>
          </div>
        </div>
        <button
          className="flex relative bg-slate-100 mt-1 w-96 h-16 rounded-3xl shadow-xl justify-center items-center"
          onClick={navigateToProfile}
        >
          <span className="profile-button-text"> Profile </span>
        </button>
        <Logout />
        <div className="close-button">
          <button id="modal-close-button" onClick={closeModal}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};
