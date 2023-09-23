import React from 'react';
import { UserDto } from '../../../interfaces/User.dto';
import { Friend } from '../../FriendList/Friend';
import { DmButton } from './DmButton';
import { AdminButton } from '../Manage/AdminButton';

interface props {
  list: UserDto[];
  role: string;
  type: string;
}

export const RoleUserList = (props: props) => {
  const { list, role, type } = props;

  return (
    <>
      <span className="font-semibold text-gray-500 text-lg">{role}</span>
      <div className="flex flex-col w-full h-[30%] flex-grow overflow-y-auto mt-3 mb-2">
        {list &&
          list.map((item) => (
            <Friend key={item.id} data={item}>
              {type === 'dm' && <DmButton item={item} />}
              {type === 'adminManage' && (
                <AdminButton
                  data={item}
                  text={role === 'admin' ? '관리자 해제' : '관리자 등록'}
                />
              )}
            </Friend>
          ))}
      </div>
    </>
  );
};
