import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentChatInfoState, roleState } from '../../atom/chat';
import { passwordModalState } from '../../atom/modal';
import { userInfo } from '../../atom/user';

export const useSetRole = () => {
  const user = useRecoilValue(userInfo);
  const roomInfo = useRecoilValue(currentChatInfoState);
  const [role, setRole] = useRecoilState(roleState);
  useEffect(() => {
    setRole(
      roomInfo.ownerId === user.id
        ? 'owner'
        : roomInfo.admin.find((item: any) => item.id === user.id)
        ? 'admin'
        : 'user'
    );
  }, [roomInfo]);
  return role;
};
