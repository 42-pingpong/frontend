import React, { useEffect, useState } from 'react';
import { MuteList } from './MuteList';
import { UserSection } from '../User/UserSection';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentChatInfoState, roleState } from '../../../atom/chat';
import {
  ChatRoomInfoDTO,
  MutedUserDto,
  ResponseUnBanDto,
  senderDTO,
} from '../../../interfaces/Chatting-Format.dto';
import axiosInstance from '../../../api/axios';
import { useParams } from 'react-router-dom';
import { userInfo } from '../../../atom/user';
import { RoomInfo } from './RoomInfo';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { BanList } from './BanList';

export const ChatManage = () => {
  const roomId = useParams().roomId;
  const user = useRecoilValue(userInfo);
  const [role, setRole] = useRecoilState(roleState);
  const [banList, setBanList] = useState<senderDTO[]>([]);
  const [muteList, setMuteList] = useState<MutedUserDto[]>([]);
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);

  useEffect(() => {
    ChatSocket.on('unban-user', handelUnBanUser);
    ChatSocket.on('unmute-user', (data) => {
      // unban과 동일하게 리스트에서 제거할거예요..
      console.log('unmute-user', data);
    });
    return () => {
      ChatSocket.off('unban-user');
      ChatSocket.off('unmute-user');
    };
  }, []);

  useEffect(() => {
    if (user.id !== -1) {
      fetchRoomInfo();
    }
  }, [user]);

  useEffect(() => {
    if (user.id === -1) return;
    if (role === 'user') {
      alert('권한이 없습니다.');
      window.history.back();
    }
  }, [roomInfo]);

  const handelUnBanUser = (data: ResponseUnBanDto) => {
    setBanList((prev) => prev.filter((item) => item.id !== data.userId));
  };

  const fetchRoomInfo = async () => {
    const res = await axiosInstance.get(`/chat/groupChat/${roomId}`);
    const data: ChatRoomInfoDTO = res.data;
    setRole(
      data.owner.id === user.id
        ? 'owner'
        : data.admin?.find((item) => item.id === user.id)
        ? 'admin'
        : 'user'
    );
    setRoomInfo(data);
    setBanList(data.bannedUsers);
    setMuteList(data.mutedUsers);
  };

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
          <UserSection bottomIconVisible={false} />
        </div>
        <div className="flex w-full justify-center bg-slate-300">
          <MuteList list={muteList} roomId={roomId as string} />
        </div>
        <div className="flex w-full justify-center bg-slate-300">
          <BanList list={banList} roomId={roomId as string}></BanList>
        </div>
      </div>
    </div>
  );
};
