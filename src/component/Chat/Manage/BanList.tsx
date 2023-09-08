import React from 'react';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { BanMuteUser } from './BanMuteUser';

export const BanList = ({
  list,
  roomId,
}: {
  list: senderDTO[];
  roomId: string;
}) => {
  return (
    <div className="flex-col flex w-full h-full px-10">
      <div className="flex">
        <ServiceTitle title={`Banned User`} nonAddButton={true} />
      </div>
      <div className="flex flex-col w-full h-full px-10 rounded-3xl shadow-2xl bg-slate-50 p-10">
        {list.map((item) => (
          <BanMuteUser
            key={item.id}
            target={item}
            listName={'Ban'}
            roomId={parseInt(roomId, 10)}
          />
        ))}
        {list?.length == 0 && (
          <div className="flex justify-center items-center h-full w-full text-2xl text-slate-400">
            No Banned User
          </div>
        )}
      </div>
    </div>
  );
};
