import React, { useEffect, useState } from 'react';
import { senderDTO } from '../../interfaces/Chatting-Format.dto';
import axiosInstance from '../../api/axios';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../atom/user';

export const useFetchBlockList = () => {
  const [blockList, setBlockList] = useState<senderDTO[]>([]);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    fetchBlockList();
  }, []);

  const fetchBlockList = async () => {
    const res = await axiosInstance.get(`/user/me/blockedUser/${user.id}`);
    setBlockList(res.data);
  };

  return { blockList, setBlockList };
};
