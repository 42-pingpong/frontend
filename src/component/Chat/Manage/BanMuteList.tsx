import React from 'react';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { BanMuteUser } from './BanMuteUser';

export const BanMuteList = ({
  list,
  listName,
  roomId,
}: {
  list: senderDTO[];
  listName: string;
  roomId: string;
}) => {
  return (
    <div className="flex-col flex w-full h-full px-10">
      <div className="flex">
        <ServiceTitle title={`${listName} User`} nonAddButton={true} />
      </div>
      <div className="flex flex-col w-full h-full px-10 rounded-3xl shadow-2xl bg-slate-50">
        {list &&
          list.map((item) => (
            <BanMuteUser
              key={item.id}
              target={item}
              listName={listName}
              roomId={parseInt(roomId, 10)}
            />
          ))}
        {list.length == 0 && (
          <div className="flex justify-center items-center h-full w-full text-2xl text-slate-400">
            No {listName} User
          </div>
        )}
      </div>
    </div>
  );
};
