import React from 'react';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';
import { userInfo } from '../../../atom/user';
import { useRecoilValue } from 'recoil';
import { ChatSocket } from '../../../sockets/ChatSocket';

export const BanMuteUser = ({
  target,
  listName,
  roomId,
}: {
  target: senderDTO;
  listName: string;
  roomId: number;
}) => {
  const user = useRecoilValue(userInfo);

  const handleUndo = () => {
    if (listName === 'Ban') {
      const ReqUnBan = {
        groupChatId: roomId,
        userId: user.id,
        bannedId: target.id,
      };
      ChatSocket.emit('unban-user', ReqUnBan);
    } else {
      const ReqUnMute = {
        groupChatId: roomId,
        userId: user.id,
        requestUserId: target.id,
      };
      ChatSocket.emit('unmute-user', ReqUnMute);
    }
  };
  return (
    <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
      <div className="flex w-14 h-14 rounded-full border-2">
        <img src={target.profile} className="flex rounded-full" />
      </div>
      <div className="flex w-1/2">
        <span className="text-gray-500 text-xl">{user.nickName}</span>
      </div>
      <div className="flex w-20 h-6">
        <button
          type="button"
          className="flex w-16 h-6 bg-white rounded-full justify-center items-center text-sm shadow-md text-gray-600"
          onClick={handleUndo}
        >
          undo
        </button>
      </div>
    </div>
  );
};
