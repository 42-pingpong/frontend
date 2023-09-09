import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import axiosInstance from '../../api/axios';
import { roleState, currentChatInfoState } from '../../atom/chat';
import { userInfo } from '../../atom/user';
import { ChatRoomInfoDTO } from '../../interfaces/Chatting-Format.dto';
import { ChatRoom } from '../../component/Chat/ChatList/ChatRoom';

export default function useFetchChatManageInfo(
  roomId: number,
  setBanList: any,
  setMuteList: any
) {
  const user = useRecoilValue(userInfo);
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);

  useEffect(() => {
    if (user.id !== -1) {
      fetchRoomInfo();
    }
  }, [user]);

  const fetchRoomInfo = async () => {
    const res = await axiosInstance.get(`/chat/groupChat/${roomId}`);
    const data: ChatRoomInfoDTO = res.data;
    setRoomInfo(data);
    setBanList(data.bannedUsers);
    setMuteList(data.mutedUsers);
  };

  return roomInfo;
}
