import React from 'react';
import { MutedUserDto } from '../../../interfaces/Chatting-Format.dto';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { BanMuteUser } from './BanMuteUser';

export const MuteList = ({
  list,
  roomId,
}: {
  list: MutedUserDto[];
  roomId: string;
}) => {
  return (
    <div className="flex-col flex w-full h-full px-10">
      <div className="flex">
        <ServiceTitle title={`Muted User`} nonAddButton={true} />
      </div>
      <div className="flex flex-col w-full h-full px-10 rounded-3xl shadow-2xl bg-slate-50 p-10">
        {list.map((item: MutedUserDto) =>
          new Date(item.muteDue) > new Date() ? (
            <BanMuteUser
              key={item.mutedUser.id}
              target={item.mutedUser}
              listName={'Mute'}
              roomId={parseInt(roomId, 10)}
            />
          ) : null
        )}
      </div>
    </div>
  );
};
