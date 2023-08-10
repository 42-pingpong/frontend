import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  chattingProfileOnRightClickModalState,
  clickedFriendProfileState,
  clickedXState,
  clickedYState,
  friendProfileModalState,
} from '../../atom/modal';
import { ChatDTO } from '../../interfaces/Chatting-Format.dto';
import { ChatUserRightClickModal } from './inChatModal/ChatUserRightClickModal';
import { useNavigate } from 'react-router-dom';

export const ChattingBubble = ({
  props,
  nickName,
}: {
  props: ChatDTO;
  nickName: string;
}) => {
  const sender = props.nickName === nickName ? 'me' : 'you';
  const navigate = useNavigate();

  const [profileRightClickModal, setProfileRightClickModal] = useRecoilState(
    chattingProfileOnRightClickModalState
  );
  const [x, setX] = useRecoilState(clickedXState);
  const [y, setY] = useRecoilState(clickedYState);

  const onLeftClickHandler = () => {
    navigate(`/profile/${nickName}`);
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
        <img src={require('../../public/soo.png')} />
      </div>

      <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-md max-w-[50%] bg-[#D9D9D9] justify-center mx-[1.5%] relative">
        <span className="mt-1 mx-1 inline-block"> {props.text} </span>
      </div>
      {profileRightClickModal && <ChatUserRightClickModal x={x} y={y} />}
    </div>
  ) : (
    <div className="flex">
      <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-md max-w-[50%] bg-sky justify-center mx-[1.5%] ml-auto relative">
        <span className="mt-1 mx-1 inline-block"> {props.text} </span>
      </div>
      <div
        className="w-14 h-14 rounded-full border-2 flex mb-[2.5%] "
        onContextMenu={onRightClickHandler}
        onClick={onLeftClickHandler}
      >
        <img src={require('../../public/soo.png')} />
      </div>
    </div>
  );
};
