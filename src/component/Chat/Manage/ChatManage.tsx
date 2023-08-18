import React, { useEffect, useState } from 'react';
import { BanList } from './BanList';
import { MuteList } from './MuteList';
import { UserSection } from '../User/UserSection';
import { useRecoilValue } from 'recoil';
import { roleState } from '../../../atom/chat';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';
import axiosInstance from '../../../api/axios';
import { useParams } from 'react-router-dom';
import { userInfo } from '../../../atom/user';
import { RoomInfo } from './RoomInfo';

export const ChatManage = () => {
  const roomId = useParams().roomId;
  const role = useRecoilValue(roleState);
  const [banList, setBanList] = useState<senderDTO>([]);
  const user = useRecoilValue(userInfo);
  const [muteList, setMuteList] = useState([]);

  const fetchBanList = async () => {
    const res = await axiosInstance.get(
      `chat/groupChat/${roomId}/banMuteList?userId=${user.id}`
    );
    console.log(res.data);
    if (res.data.length === 1) {
      setBanList(res.data[0].banList);
      setMuteList(res.data[0].muteList);
    }
  };

  useEffect(() => {
    fetchBanList();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-200 py-20 px-16">
      <div className="w-full h-[20vh] bg-red-200 justify-center">
        <RoomInfo />
      </div>
      <div className="grid w-full h-full grid-cols-3 gap-10 bg-red-100">
        <div className="flex w-full justify-center bg-slate-300">
          <UserSection bottomIconVisible={false} />
        </div>
        <div className="grid w-full justify-center bg-slate-300">
          <BanList list={banList} />
        </div>
        <div className="grid w-full justify-center bg-slate-300">
          <MuteList list={muteList} />
        </div>
      </div>
    </div>
  );
};
