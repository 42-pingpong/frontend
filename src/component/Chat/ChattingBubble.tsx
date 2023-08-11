import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chattingProfileOnRightClickModalState,
  clickedXState,
  clickedYState,
} from '../../atom/modal';
import { ResponseGroupChatDTO } from '../../interfaces/Chatting-Format.dto';
import { ChatUserRightClickModal } from './inChatModal/ChatUserRightClickModal';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../atom/user';

export const ChattingBubble = ({ props }: { props: ResponseGroupChatDTO }) => {
  const user = useRecoilValue(userInfo);
  const sender = props.messageInfo.sender.id === user.id ? 'me' : 'you';
  const navigate = useNavigate();

  const [profileRightClickModal, setProfileRightClickModal] = useRecoilState(
    chattingProfileOnRightClickModalState
  );
  const [x, setX] = useRecoilState(clickedXState);
  const [y, setY] = useRecoilState(clickedYState);

  const onLeftClickHandler = () => {
    if (sender === 'me') navigate('/profile');
    else navigate(`/profile/:${props.messageInfo.sender.nickname}`);
  };

  const onRightClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setX(e.clientX);
    setY(e.clientY);
    setProfileRightClickModal(!profileRightClickModal);
  };

  return sender !== 'me' ? (
    <div className="flex">
      <div
        className="w-14 h-14 rounded-full border-2 flex mb-[2.5%]"
        onContextMenu={onRightClickHandler}
        onClick={onLeftClickHandler}
      >
        <img
          src={props.messageInfo.sender.profile}
          className="flex rounded-full"
        />
      </div>

      <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-md max-w-[50%] bg-[#D9D9D9] justify-center mx-[1.5%] relative">
        <span className="mt-1 mx-1 inline-block">
          {props.messageInfo.message}
        </span>
      </div>
      {profileRightClickModal && <ChatUserRightClickModal x={x} y={y} />}
    </div>
  ) : (
    <div className="flex">
      <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-md max-w-[50%] bg-sky justify-center mx-[1.5%] ml-auto relative">
        <span className="mt-1 mx-1 inline-block">
          {props.messageInfo.message}
        </span>
      </div>
      <div
        className="w-14 h-14 rounded-full border-2 flex mb-[2.5%] "
        onContextMenu={onRightClickHandler}
        onClick={onLeftClickHandler}
      >
        <img
          src={props.messageInfo.sender.profile}
          className="flex rounded-full"
        />
      </div>
    </div>
  );
};
