import React from 'react';
import { ServiceTitle } from '../Main/ServiceTitle';
import { StatusIcon } from './StatusIcon';
import { User } from './User';

export interface userList {
  id: number;
  name: string;
  status: string;
  //image: string;
}

export const userData = [
  {
    id: 1,
    name: 'user1',
    status: 'online',
  },
  {
    id: 2,
    name: 'user2',
    status: 'offline',
  },
  {
    id: 3,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 14,
    name: 'user1',
    status: 'online',
  },
  {
    id: 23,
    name: 'user2',
    status: 'offline',
  },
  {
    id: 35,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 315,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 1,
    name: 'user1',
    status: 'online',
  },
  {
    id: 2,
    name: 'user2',
    status: 'offline',
  },
  {
    id: 3,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 14,
    name: 'user1',
    status: 'online',
  },
  {
    id: 23,
    name: 'user2',
    status: 'offline',
  },
  {
    id: 35,
    name: 'user3',
    status: 'ingame',
  },
  {
    id: 315,
    name: 'user3',
    status: 'ingame',
  },
];

export const UserList = () => {
  return (
    <div className="flex h-full w-72 md:w-full flex-col">
      <div className="flex">
        <ServiceTitle title="Friends" />
      </div>
      <div className="flex flex-col w-full h-60 flex-grow px-10 rounded-[2rem] shadow-2xl bg-white">
        <div className="flex flex-row h-14 w-full justify-between mt-10 px-3">
          <StatusIcon props={{ status: 'online', color: 'bg-green-400' }} />
          <StatusIcon props={{ status: 'offline', color: 'bg-red-400' }} />
          <StatusIcon props={{ status: 'ingame', color: 'bg-blue-400' }} />
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto mt-3 mb-10">
          {userData.map((item) => (
            <User key={item.id} props={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
