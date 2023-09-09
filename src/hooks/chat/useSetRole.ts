import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentChatInfoState, roleState } from '../../atom/chat';
import { passwordModalState } from '../../atom/modal';
import { userInfo } from '../../atom/user';
import { ChatRoomInfoDTO } from '../../interfaces/Chatting-Format.dto';

export function useSetRole() {
  const user = useRecoilValue(userInfo);
  const roomInfo = useRecoilValue(currentChatInfoState);
  const [role, setRole] = useRecoilState(roleState);

  useEffect(() => {
    if (!roomInfo) return;
    setRole(
      roomInfo.owner.id === user.id
        ? 'owner'
        : roomInfo.admin.find((item: any) => item.id === user.id)
        ? 'admin'
        : 'user'
    );
  }, [roomInfo]);

  return role;
}
