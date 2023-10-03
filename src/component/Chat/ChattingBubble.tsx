import { useRecoilValue } from 'recoil';
import { MessageInfoDTO } from '../../interfaces/Chatting-Format.dto';
import { ChatUserRightClickModal } from './inChatModal/ChatUserRightClickModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { userInfo } from '../../atom/user';
import React, { memo, useState } from 'react';
import { muteModalState } from '../../atom/modal';
import { MuteTimeModal } from './inChatModal/MuteTimeModal';
import { currentChatInfoState } from '../../atom/chat';

export const ChattingBubble = memo((props: MessageInfoDTO) => {
  const user = useRecoilValue(userInfo);
  const sender = props.sender.id === user.id ? 'me' : 'you';
  const navigate = useNavigate();
  const location = useLocation();
  const roomInfo = useRecoilValue(currentChatInfoState);

  const isMuteModalOpen = useRecoilValue(muteModalState);
  const [profileRightClickModal, setProfileRightClickModal] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const onLeftClickHandler = () => {
    if (sender === 'me') navigate('/profile');
    else navigate(`/profile/${props.sender.nickName}`);
  };

  const onRightClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setX(e.clientX);
    setY(e.clientY);
    setProfileRightClickModal(true);
  };

  return sender !== 'me' ? (
    <div className="flex">
      <div
        className="w-14 h-14 rounded-full border-2 flex mb-[2.5%]"
        onContextMenu={
          location.pathname.split('/')[1] === 'chat'
            ? onRightClickHandler
            : undefined
        }
        onClick={onLeftClickHandler}
      >
        <img
          src={props.sender.profile}
          className="flex rounded-full w-14 h-14"
        />
      </div>
      <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-md max-w-[50%] bg-[#D9D9D9] justify-center mx-[1.5%] flex">
        <span className="mt-1 mx-1 inline-block">{props.message}</span>
      </div>
      {profileRightClickModal && (
        <ChatUserRightClickModal
          x={x}
          y={y > 900 ? y - 50 : y}
          user={props.sender}
          onClosed={() => setProfileRightClickModal(false)}
        />
      )}
      {isMuteModalOpen && (
        <MuteTimeModal
          groupChatId={roomInfo.groupChatId}
          userId={props.sender.id}
          requestUserId={user.id}
        />
      )}
    </div>
  ) : (
    <div className="flex">
      <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-md max-w-[50%] bg-sky justify-center mx-[1.5%] ml-auto flex">
        <span className="mt-1 mx-1 inline-block">{props.message}</span>
      </div>
      <div
        className="w-14 h-14 rounded-full border-2 flex mb-[2.5%] "
        onClick={onLeftClickHandler}
      >
        <img
          src={props.sender.profile}
          className="flex rounded-full w-14 h-14"
        />
      </div>
    </div>
  );
});
