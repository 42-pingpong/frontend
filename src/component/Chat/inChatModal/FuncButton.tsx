import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
      case 'Ban':
        //socket.emit('ban', { id: id, target: target });
        break;
      case 'Mute':
        //socket.emit('mute', { id: id, target: target });
        break;
      case 'Profile':
        // navigate('/profile/:${userNickName}'); -> props로 받아와야됨
        break;
      case 'Go PingPong':
        //socket.emit('goPingPong', { id: id, target: target }); // 근데 status socket으로 보내..?
        break;
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
