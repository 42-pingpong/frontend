import React from 'react';
import { UserDto } from '../../../interfaces/User.dto';
import { Friend } from '../../FriendList/Friend';
import { DmButton } from './DmButton';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../atom/user';
import { useNavigate } from 'react-router-dom';

interface props {
  list: UserDto[];
  role: string;
}

export const RoleUserList = (props: props) => {
  const { list, role } = props;

  return (
    <>
      <span className="font-semibold text-gray-500 text-lg">{role}</span>
      <div className="flex flex-col w-full h-[30%] flex-grow overflow-y-auto mt-3 mb-2">
        {list &&
          list.map((item) => (
            <Friend key={item.id} data={item}>
              <DmButton item={item} />
            </Friend>
          ))}
      </div>
    </>
  );
};
