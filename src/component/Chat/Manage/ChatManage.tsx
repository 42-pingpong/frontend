import React, { useEffect, useState } from 'react';
import { MuteList } from './MuteList';
import { UserSection } from '../User/UserSection';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { userInfo } from '../../../atom/user';
import { RoomInfo } from './RoomInfo';
import { BanList } from './BanList';
import useUnBan from '../../../hooks/chat/useUnBan';
import useUnMute from '../../../hooks/chat/useUnMute';
import { useSetRole } from '../../../hooks/chat/useSetRole';
import useFetchChatManageInfo from '../../../hooks/chat/useFetchChatManageInfo';

export const ChatManage = () => {
  const roomId = useParams().roomId;
  const user = useRecoilValue(userInfo);
  const role = useSetRole();
  const { banList, setBanList } = useUnBan();
  const { muteList, setMuteList } = useUnMute();
  const roomInfo = useFetchChatManageInfo(
    Number(roomId),
    setBanList,
    setMuteList
  );

  useEffect(() => {
    if (roomInfo === undefined || user.id === -1) return;
    if (role === 'user') {
      alert('권한이 없습니다.');
      window.history.back();
    }
  }, [roomInfo]);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 py-20 px-16">
      <div className="w-full h-[20vh] bg-red-200 justify-center">
        <RoomInfo />
      </div>
      <div className="grid w-full h-full grid-cols-1 xl:grid-cols-3 gap-10 bg-red-100">
        <div className="flex w-full justify-center bg-slate-300">
          {/* 뺄까 생각중입니다 
          이 컴포넌트에서 admin권한을 줬다 뺐는 걸 만드려했어요..
          admin이랑 joined user 두개만 분리하고
          admin 한테는 권한을 뺏는 버튼
          user한테는 권한을 주는 버튼만 달려고 했습니다.. */}
          <UserSection bottomIconVisible={false} adminButtonVisible={true} />
        </div>
        <div className="flex w-full justify-center bg-slate-300">
          <MuteList list={muteList} roomId={roomId as string} />
        </div>
        <div className="flex w-full justify-center bg-slate-300">
          <BanList list={banList} roomId={roomId as string} />
        </div>
      </div>
    </div>
  );
};
