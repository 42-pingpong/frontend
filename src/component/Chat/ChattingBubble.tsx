import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chattingProfileOnRightClickModalState,
  clickedUserState,
  clickedXState,
  clickedYState,
} from '../../atom/modal';
import {
  ResponseGroupChatDTO,
  senderDTO,
} from '../../interfaces/Chatting-Format.dto';
import { ChatUserRightClickModal } from './inChatModal/ChatUserRightClickModal';
import { useNavigate } from 'react-router-dom';
import { userInfo } from '../../atom/user';
import { memo } from 'react';
import React from 'react';

export const ChattingBubble = memo(
  ({ props }: { props: ResponseGroupChatDTO }) => {
    const user = useRecoilValue(userInfo);
    const sender = props.messageInfo.sender.id === user.id ? 'me' : 'you';
    const navigate = useNavigate();

    const [profileRightClickModal, setProfileRightClickModal] = useRecoilState(
      chattingProfileOnRightClickModalState
    );
    const [x, setX] = useRecoilState(clickedXState);
    const [y, setY] = useRecoilState(clickedYState);
    const [clickedUser, setClickedUser] = useRecoilState(clickedUserState);

    const onLeftClickHandler = () => {
      if (sender === 'me') navigate('/profile');
      else {
        navigate(`/profile/${props.messageInfo.sender.nickName}`);
      }
    };

    const onRightClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setX(e.clientX);
      setY(e.clientY);
      setClickedUser(props.messageInfo.sender);
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
        <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-md max-w-[50%] bg-[#D9D9D9] justify-center mx-[1.5%] flex">
          <span className="mt-1 mx-1 inline-block">
            {props.messageInfo.message}
          </span>
        </div>
        {profileRightClickModal && (
          <ChatUserRightClickModal
            x={x}
            y={y > 900 ? y - 50 : y}
            user={clickedUser}
          />
        )}
      </div>
    ) : (
      <div className="flex">
        <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-md max-w-[50%] bg-sky justify-center mx-[1.5%] ml-auto flex">
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
  }
);
