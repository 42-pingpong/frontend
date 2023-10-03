import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import axiosInstance from '../../api/axios';
import { currentChatInfoState } from '../../atom/chat';
import { UserDto } from '../../interfaces/User.dto';

export default function useFetchChatUsers() {
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);
  const [owner, setOwner] = useState<UserDto>();
  const [admin, setAdmin] = useState<UserDto[]>([]);
  const [joinedUser, setJoinedUser] = useState<UserDto[]>([]);

  useEffect(() => {
    fetchOwner();
    fetchAdmins();
    fetchJoinedUser();
  }, [roomInfo]);

  const fetchOwner = async () => {
    const res = await axiosInstance.get(`/user/public/${roomInfo.owner.id}`);
    setOwner(res.data);
  };

  const fetchAdmins = async () => {
    try {
      const adminPromises = roomInfo.admin.map(async (item) => {
        const res = await axiosInstance.get(`/user/public/${item.id}`);
        return res.data;
      });

      const admins: UserDto[] = await Promise.all(adminPromises);
      if (admins === undefined) return;
      setAdmin(admins);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJoinedUser = async () => {
    try {
      const joinedUserPromises = roomInfo.joinedUser.map(async (item) => {
        const res = await axiosInstance.get(`/user/public/${item.id}`);
        return res.data;
      });

      const joinedUsers: UserDto[] = await Promise.all(joinedUserPromises);
      if (joinedUsers === undefined) return;
      setJoinedUser(joinedUsers);
    } catch (error) {
      console.error(error);
    }
  };
  return { owner, admin, joinedUser };
}
