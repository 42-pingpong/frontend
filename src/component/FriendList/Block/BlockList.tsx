import React from 'react';
import { useFetchBlockList } from '../../../hooks/user/useFetchBlockList';
import {
  RequestUnBlockDto,
  senderDTO,
} from '../../../interfaces/Chatting-Format.dto';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../atom/user';
import { BlockUser } from './BlockUser';

export const BlockList = () => {
  const user = useRecoilValue(userInfo);
  const { blockList, setBlockList } = useFetchBlockList();

  const handleUnBlock = (unblockedUserId: number) => {
    const unBlockData: RequestUnBlockDto = {
      userId: user.id,
      unBlockedUserId: unblockedUserId,
    };

    ChatSocket.emit('unblock-user', unBlockData);
    setBlockList(blockList.filter((item) => item.id !== unblockedUserId));
  };

  return (
    <div className="flex flex-col">
      {blockList.map((item) => (
        <BlockUser
          key={item.id}
          props={item}
          onClick={() => handleUnBlock(item.id)}
        />
      ))}
    </div>
  );
};
