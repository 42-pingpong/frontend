import { useRecoilValue } from 'recoil';
import { FuncButton } from './FuncButton';
import { roleState } from '../../../atom/chat';
import { userInfo } from '../../../atom/user';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';

interface Props {
  user: senderDTO;
  x: number;
  y: number;
  onClosed: () => void;
}

export const ChatUserRightClickModal = (props: Props) => {
  const user = useRecoilValue(userInfo);
  const role = useRecoilValue(roleState);

  if (user.id === props.user.id) {
    props.onClosed();
    return null;
  }

  const handleContentClick = (e: any) => {
    e.stopPropagation();
    setTimeout(() => {
      props.onClosed();
    }, 200);
  };

  if (role === 'user')
    return (
      <div
        aria-hidden={true}
        className="background bg-[rgba(0,0,0,0.1)]"
        onClick={props.onClosed}
      >
        <div
          id="chat-profile-right-content"
          className={`relative flex flex-col w-[11rem] h-[7rem] z-50 bg-white rounded-3xl shadow-lg items-center justify-center py-2`}
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
        onClick={props.onClosed}
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
        </div>
      </div>
    );
};
