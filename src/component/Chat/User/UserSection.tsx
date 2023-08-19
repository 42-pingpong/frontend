import { useRecoilState } from 'recoil';
import { currentChatInfoState } from '../../../atom/chat';
import { useLayoutEffect, useState } from 'react';
import { UserDto } from '../../../interfaces/User.dto';
import axiosInstance from '../../../api/axios';
import { UserList } from './UserList';

export const UserSection = ({
  bottomIconVisible,
}: {
  bottomIconVisible: boolean;
}) => {
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);
  const [owner, setOwner] = useState<UserDto>();
  const [admin, setAdmin] = useState<UserDto[]>([]);
  const [joinedUser, setJoinedUser] = useState<UserDto[]>([]);

  useLayoutEffect(() => {
    fetchOwner();
    fetchAdmins();
    fetchJoinedUser();
  }, [roomInfo]);

  const fetchOwner = async () => {
    const res = await axiosInstance.get(`/user/public/${roomInfo.ownerId}`);
    setOwner(res.data);
  };

  const fetchAdmins = async () => {
    try {
      const adminPromises = roomInfo.admin.map(async (item) => {
        const res = await axiosInstance.get(`/user/public/${item.id}`);
        return res.data;
      });

      const admins: UserDto[] = await Promise.all(adminPromises);
      if (admins.length === 0 || admins === undefined) return;
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
      if (joinedUsers.length === 0 || joinedUsers === undefined) return;
      setJoinedUser(joinedUsers);
    } catch (error) {
      console.error(error);
    }
  };

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
