import React from 'react';
import { useFetchBlockList } from '../../../hooks/user/useFetchBlockList';
import {
  RequestUnBlockDto,
  senderDTO,
} from '../../../interfaces/Chatting-Format.dto';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../atom/user';

const BlockUser = ({ props }: { props: senderDTO }) => {
  const user = useRecoilValue(userInfo);

  const handleUnBlock = () => {
    const unBlockData: RequestUnBlockDto = {
      userId: user.id,
      unBlockedUserId: props.id,
    };

    console.log('unblock-user', unBlockData);
    ChatSocket.emit('unblock-user', unBlockData);
    //지금은 404 에러 오는데 unblock하고 난 다음에 다시 blocklist를 불러와야함 아니면 리스트에서 삭제해야함
  };

  return (
    <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
      <div className="flex w-14 h-14 rounded-full border-2">
        <img src={props.profile} className="flex rounded-full" />
      </div>
      <div className="flex w-1/2">
        <span className="text-gray-500 text-xl">{props.nickName}</span>
      </div>
      <div className="flex w-20 h-6">
        <button
          onClick={handleUnBlock}
          className="h-full w-full bg-progressBlue text-white rounded-full shadow-md text-sm"
        >
          un-block
        </button>
      </div>
    </div>
  );
};

export const BlockList = () => {
  const blockList = useFetchBlockList();

  return (
    <div className="flex">
      {blockList.map((item) => (
        <BlockUser key={item.id} props={item} />
      ))}
    </div>
  );
};
