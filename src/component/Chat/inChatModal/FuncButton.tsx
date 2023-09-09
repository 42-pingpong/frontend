import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RequestBanDto,
  RequestBlockDto,
  RequestGoPingPongDto,
  RequestKickDto,
  senderDTO,
} from '../../../interfaces/Chatting-Format.dto';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentChatInfoState } from '../../../atom/chat';
import { userInfo } from '../../../atom/user';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { goPingPongModalState, muteModalState } from '../../../atom/modal';
import { GameSocket } from '../../../sockets/GameSocket';

export const FuncButton = ({
  name,
  target,
}: {
  name: string;
  target: senderDTO;
}) => {
  const navigate = useNavigate();
  const roomInfo = useRecoilValue(currentChatInfoState);
  const user = useRecoilValue(userInfo);
  const setMuteModal = useSetRecoilState(muteModalState);
  const setGoPingPongModal = useSetRecoilState(goPingPongModalState);

  const handelModalFuc = () => {
    switch (name) {
      case 'Kick': {
        if (roomInfo.ownerId === target.id) {
          alert('방장은 추방할 수 없습니다.');
          return;
        }
        if (roomInfo.admin.find((item) => item.id === target.id)) {
          alert('관리자는 추방할 수 없습니다.');
          return;
        }
        const reqData: RequestKickDto = {
          groupChatId: roomInfo.groupChatId,
          kickUserId: target.id,
          requestUserId: user.id,
        };
        ChatSocket.emit('kick-user', reqData);
        break;
      }
      case 'Block': {
        const reqData: RequestBlockDto = {
          userId: user.id,
          blockedUserId: target.id,
        };
        ChatSocket.emit('block-user', reqData);
        break;
      }
      case 'Ban': {
        if (roomInfo.ownerId === target.id) {
          alert('방장은 추방할 수 없습니다.');
          return;
        }
        if (roomInfo.admin.find((item) => item.id === target.id)) {
          alert('관리자는 추방할 수 없습니다.');
          return;
        }
        const reqData: RequestBanDto = {
          groupChatId: roomInfo.groupChatId,
          bannedId: target.id,
          userId: user.id,
        };
        ChatSocket.emit('ban-user', reqData);
        break;
      }
      case 'Mute':
        console.log('mute');
        setMuteModal(true);
        break;
      case 'Go PingPong': {
        const reqData: RequestGoPingPongDto = {
          groupChatId: roomInfo.groupChatId,
          userId: user.id,
          userNickName: user.nickName,
          targetUserId: target.id,
          targetUserNickName: target.nickName,
        };
        ChatSocket.emit('go-pingpong', reqData);
        console.log('pp');
        break;
      }
      default:
        break;
    }
  };
  return (
    <button
      className="flex w-[80%] h-10 rounded-full my-2 shadow-md justify-center items-center bg-progressBlue"
      onClick={handelModalFuc}
    >
      <span className="text-lg font-semibold text-white">{name}</span>
    </button>
  );
};
