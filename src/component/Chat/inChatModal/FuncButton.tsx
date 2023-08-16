import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RequestBanDto,
  RequestKickDto,
  senderDTO,
} from '../../../interfaces/Chatting-Format.dto';
import { useRecoilValue } from 'recoil';
import { currentChatInfoState } from '../../../atom/chat';
import { userInfo } from '../../../atom/user';
import { ChatSocket } from '../../../sockets/ChatSocket';

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
        // socket.emit('block-user', { id: id, target: target });
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
        //socket.emit('mute', { id: id, target: target });
        break;
      case 'Profile':
        // navigate('/profile/:${userNickName}'); -> props로 받아와야됨
        break;
      case 'Go PingPong': {
        break;
      }
      default:
        break;
    }
  };
  return (
    <div
      className="flex w-[80%] h-10 rounded-full my-2 shadow-md justify-center items-center bg-progressBlue"
      onClick={handelModalFuc}
    >
      <span className="text-lg font-semibold text-white">{name}</span>
    </div>
  );
};
