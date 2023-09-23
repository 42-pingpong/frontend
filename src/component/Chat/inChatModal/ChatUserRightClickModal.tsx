import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chattingProfileOnRightClickModalState,
  muteModalState,
} from '../../../atom/modal';
import { FuncButton } from './FuncButton';
import { currentChatInfoState, roleState } from '../../../atom/chat';
import { userInfo } from '../../../atom/user';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';
import { MuteTimeModal } from './MuteTimeModal';
import { closeModal } from '../../../utils/modalClose';

interface Props {
  user: senderDTO;
  x: number;
  y: number;
}

export const ChatUserRightClickModal = (props: Props) => {
  const user = useRecoilValue(userInfo);
  const roomInfo = useRecoilValue(currentChatInfoState);
  const role = useRecoilValue(roleState);
  const isMuteModalOpen = useRecoilValue(muteModalState);
  const [modal, setModal] = useRecoilState(
    chattingProfileOnRightClickModalState
  );

  if (user.id === props.user.id) {
    setModal(false);
    return null;
  }

  const handleContentClick = (e: any) => {
    e.stopPropagation();
  };

  if (role === 'user')
    return (
      <div
        aria-hidden={true}
        className="background bg-[rgba(0,0,0,0.1)]"
        onClick={() => closeModal(modal, setModal)}
      >
        <div
          id="chat-profile-right-content"
          className={`relative flex flex-col w-[11rem] h-[7rem] z-10 bg-white rounded-3xl shadow-lg items-center justify-center py-2`}
          style={{ left: `${props.x + 20}px`, top: `${props.y - 20}px` }}
          onClick={handleContentClick}
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
        onClick={() => closeModal(modal, setModal)}
      >
        <div
          id="chat-profile-right-content"
          className={`relative flex flex-col w-[11rem] h-[15rem] z-10 bg-white rounded-3xl shadow-lg items-center justify-center py-2`}
          style={{ left: `${props.x + 20}px`, top: `${props.y - 20}px` }}
          onClick={handleContentClick}
        >
          <FuncButton name={'Kick'} target={props.user} />
          <FuncButton name={'Ban'} target={props.user} />
          <FuncButton name={'Mute'} target={props.user} />
          <FuncButton name={'Block'} target={props.user} />
          <FuncButton name={'Go PingPong'} target={props.user} />
          {isMuteModalOpen && (
            <MuteTimeModal
              groupChatId={roomInfo.groupChatId}
              userId={props.user.id}
              requestUserId={user.id}
            />
          )}
        </div>
      </div>
    );
};
