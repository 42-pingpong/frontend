import { useRecoilState } from 'recoil';
import { currentChatInfoState } from '../../../atom/chat';
import { useLayoutEffect, useState } from 'react';
import { UserDto } from '../../../interfaces/User.dto';
import axiosInstance from '../../../api/axios';
import { UserList } from './UserList';
import useFetchChatUsers from '../../../hooks/chat/useFetchChatUsers';

export const UserSection = ({
  bottomIconVisible,
}: {
  bottomIconVisible: boolean;
}) => {
  const { owner, admin, joinedUser } = useFetchChatUsers();

  return (
    <div className="flex w-full h-full justify-center">
      <UserList
        owner={owner}
        admin={admin}
        joinedUser={joinedUser}
        bottomIconVisible={bottomIconVisible}
      />
    </div>
  );
};
