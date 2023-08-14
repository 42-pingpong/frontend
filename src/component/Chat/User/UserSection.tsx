import { ServiceTitle } from '../../Main/ServiceTitle';
import { StatusIcon } from '../../FriendList/StatusIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { Friend } from '../../FriendList/Friend';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { currentChatInfoState } from '../../../atom/chat';
import { useEffect, useState } from 'react';
import { UserDto } from '../../../interfaces/User.dto';
import axiosInstance from '../../../api/axios';
import {
  clickedXState,
  clickedYState,
  clickedFriendProfileState,
  friendProfileModalState,
} from '../../../atom/modal';
import { FriendProfileModal } from '../../FriendList/FriendProfileModal';

export const UserSection = () => {
  const navigation = useNavigate();
  const id = useParams().id;
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);
  const [owner, setOwner] = useState<UserDto>();
  const [admin, setAdmin] = useState<UserDto[]>();
  const [joinedUser, setJoinedUser] = useState<UserDto[]>([]);
  const clickedX = useRecoilValue(clickedXState);
  const clickedY = useRecoilValue(clickedYState);
  const clickedFriendProfile = useRecoilValue(clickedFriendProfileState);
  const isFirendProfileModalOpen = useRecoilValue(friendProfileModalState);

  useEffect(() => {
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

  const handleLeaveGroupChatRoom = () => {
    console.log('leave');
    ChatSocket.emit('leave-room', id);
    navigation('/');
  };

  return (
    <div id="friends-section" className="flex-col flex h-full">
      <div className="flex">
        <ServiceTitle title="User" nonAddButton={true} />
      </div>
      <div className="flex flex-col w-full h-[50%] flex-grow px-10 rounded-3xl shadow-2xl bg-slate-50">
        <div className="flex flex-row h-14 w-full justify-between mt-10 px-3">
          <StatusIcon props={{ status: 'online', color: 'bg-green-400' }} />
          <StatusIcon props={{ status: 'offline', color: 'bg-red-400' }} />
          <StatusIcon props={{ status: 'ingame', color: 'bg-blue-400' }} />
        </div>
        <div className="flex flex-col w-full h-full mt-3 mb-10">
          <span>owner</span>
          {owner && <Friend props={owner} />}
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto mt-3 mb-10">
          <span>admin</span>
          {admin && admin.map((item) => <Friend key={item.id} props={item} />)}
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto mt-3 mb-10">
          <span>user</span>
          {joinedUser &&
            joinedUser.map((item) => <Friend key={item.id} props={item} />)}
        </div>
        <div className="relative">
          <img
            src={require('../../../public/quit.png')}
            className=" mx-auto float-right mb-12 mr-3 w-9 h-7"
            onClick={handleLeaveGroupChatRoom}
          ></img>
        </div>
      </div>
      {isFirendProfileModalOpen && (
        <FriendProfileModal
          user={clickedFriendProfile}
          x={clickedX}
          y={clickedY}
        />
      )}
    </div>
  );
};
