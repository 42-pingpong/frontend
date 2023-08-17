import { useRecoilState, useRecoilValue } from 'recoil';
import { chattingProfileOnRightClickModalState } from '../../../atom/modal';
import { FuncButton } from './FuncButton';
import { currentChatInfoState, roleState } from '../../../atom/chat';
import { userInfo } from '../../../atom/user';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';

interface Props {
  user: senderDTO;
  x: number;
  y: number;
}

export const ChatUserRightClickModal = (props: Props) => {
  const [modal, setModal] = useRecoilState(
    chattingProfileOnRightClickModalState
  );

  const role = useRecoilValue(roleState);

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('chat-profile-right-content');

    if (modalContent && modalContent.contains(e.target)) e.stopPropagation();
    else setModal(!modal);
  };

  if (props.y > 900) props.y -= 300;

  if (role === 'user')
    return (
      <div
        aria-hidden={true}
        className="background bg-[rgba(0,0,0,0.1)]"
        onClick={closeModal}
      >
        <div
          id="chat-profile-right-content"
          className={`relative flex flex-col w-[11rem] h-[7rem] z-10 bg-white rounded-3xl shadow-lg items-center justify-center py-2`}
          style={{ left: `${props.x + 20}px`, top: `${props.y - 20}px` }}
        >
          <FuncButton name={'Block'} target={props.user} />
          <FuncButton name={'Go PingPong'} target={props.user} />
        </div>
      </div>
    );
  else
    return (
      <div
        aria-hidden={true}
        className="background bg-[rgba(0,0,0,0.1)]"
        onClick={closeModal}
      >
        <div
          id="chat-profile-right-content"
          className={`relative flex flex-col w-[11rem] h-[15rem] z-10 bg-white rounded-3xl shadow-lg items-center justify-center py-2`}
          style={{ left: `${props.x + 20}px`, top: `${props.y - 20}px` }}
        >
          <FuncButton name={'Kick'} target={props.user} />
          <FuncButton name={'Ban'} target={props.user} />
          <FuncButton name={'Mute'} target={props.user} />
          <FuncButton name={'Block'} target={props.user} />
          <FuncButton name={'Go PingPong'} target={props.user} />
        </div>
      </div>
    );
};
