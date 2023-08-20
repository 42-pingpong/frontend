import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ChatSection } from './ChatSection';
import { UserSection } from './User/UserSection';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { NotificationModal } from '../Header/NotificationModal';
import { ProfileModal } from '../Header/ProfileModal';
import { currentChatInfoState, roleState } from '../../atom/chat';
import { userInfo } from '../../atom/user';
import { ChatSocket } from '../../sockets/ChatSocket';
import { useNavigate, useParams } from 'react-router-dom';
import { PasswordModal } from './ChatList/PasswordModal';
import {
  profileModalState,
  notificationModalState,
  passwordModalState,
} from '../../atom/modal';
import {
  ChatRoomInfoDTO,
  JoinGroupChatDTO,
} from '../../interfaces/Chatting-Format.dto';
import { Loading } from '../Loading';

export const Chat = () => {
  const isNotificationModalOpen = useRecoilValue(notificationModalState);
  const isProfileModalOpen = useRecoilValue(profileModalState);
  const isPasswordModalOpen = useRecoilValue(passwordModalState);

  const user = useRecoilValue(userInfo);
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);
  const setPassword = useSetRecoilState(passwordModalState);
  const setRole = useSetRecoilState(roleState);
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (params.id === undefined || params.levelOfPublicity === undefined) {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
    if (params.levelOfPublicity === 'Pub') {
      console.log("ChatSocket.emit('join-room', requestJoinChatRoom);");
      ChatSocket.emit('join-room', requestJoinChatRoom);
    } else if (params.levelOfPublicity === 'Prot') {
      setPassword(true);
    }
    ChatSocket.on('join-room', handleJoinChatRoom);
    ChatSocket.on('error', handleError);

    return () => {
      ChatSocket.off('join-room', handleJoinChatRoom);
      ChatSocket.off('error', handleError);
    };
  }, [user]);

  useEffect(() => {
    setRole(
      roomInfo.ownerId === user.id
        ? 'owner'
        : roomInfo.admin.find((item: any) => item.id === user.id)
        ? 'admin'
        : 'user'
    );
  }, [roomInfo]);

  const requestJoinChatRoom: JoinGroupChatDTO = {
    groupChatId: parseInt(params.id as string, 10),
    userId: user.id,
  };

  const handleError = (data: any) => {
    alert('채팅방에 입장할 수 없습니다.');
    navigate('/');
  };

  const handleJoinChatRoom = (data: ChatRoomInfoDTO) => {
    setRoomInfo(data);
    setLoading(false);
  };

  if (isPasswordModalOpen) {
    return <PasswordModal groupChatId={params.id as string} />;
  } else if (loading) {
    return <Loading />;
  } else
    return (
      <div className="h-screen bg-slate-100 p-20 justify-center flex">
        <div className="pt-[2%] grid grid-cols-3 grid-rows-6 gap-20 w-full h-[80vh] max-w-[1800px]">
          <div className="col-span-2 row-span-6">
            <ChatSection />
          </div>
          <div className="col-span-1 row-span-6">
            <UserSection bottomIconVisible={true} />
          </div>
        </div>
        {isProfileModalOpen && <ProfileModal />}
        {isNotificationModalOpen && <NotificationModal />}
      </div>
    );
};
