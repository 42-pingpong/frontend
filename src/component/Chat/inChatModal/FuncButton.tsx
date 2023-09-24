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
import {
  goPingPongModalState,
  goPingPongModeSelectModalState,
  goPingPongRequestedDataState,
  muteModalState,
} from '../../../atom/modal';
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
  const setGoPingPongModeSelectModal = useSetRecoilState(
    goPingPongModeSelectModalState
  );
  const setGoPingPongRequestedData = useSetRecoilState(
    goPingPongRequestedDataState
  );

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
        /**
         * block 리스트 받으면 블락리스트에 있는 유저는 차단못하게 예외처리하기. 지금은 403리턴해줘서 채팅방 입장 못한다는 얼러트 뜨는 에러 있음
         * */
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
        setGoPingPongModeSelectModal(true);
        setGoPingPongRequestedData(reqData);

        // setGoPingPongModal(true);
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
