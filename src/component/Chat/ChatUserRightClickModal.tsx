import { useRecoilState } from 'recoil';
import {
  chattingProfileOnRightClickModalState,
  friendProfileModalState,
} from '../../atom/modal';
import { UserDto } from '../../interfaces/User.dto';
import { useNavigate } from 'react-router-dom';

interface Props {
  x: number;
  y: number;
}

export const ChatUserRightClickModal = (props: Props) => {
  const navigation = useNavigate();
  const [modal, setModal] = useRecoilState(
    chattingProfileOnRightClickModalState
  );

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('chat-profile-right-content');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (
      modalContent &&
      modalContent.contains(e.target) &&
      e.target !== modalCloseButton
    )
      e.stopPropagation();
    else setModal(!modal);
  };

  const navigateToProfile = (nickName: string) => {
    setModal(!modal);
  };

  if (props.y > 900) props.y -= 300;

  return (
    <div className="background bg-[rgba(0,0,0,0.1)]" onClick={closeModal}>
      <div
        id="chat-profile-right-content"
        className={`relative flex flex-col  w-[28rem] h-[24rem] z-10 bg-white rounded-3xl shadow-lg`}
        style={{ left: `${props.x + 20}px`, top: `${props.y - 20}px` }}
      >
        <span className="profile-button-text"> Profile </span>
      </div>
      <button
        id="modal-close-button"
        className="absolute top-3 right-7 p-0 text-gray-400 text-lg"
        onClick={closeModal}
      >
        X
      </button>
    </div>
  );
};
