import React from 'react';
import axiosInstance from '../../../api/axios';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';
import { UserDto } from '../../../interfaces/User.dto';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentChatInfoState } from '../../../atom/chat';
import { userInfo } from '../../../atom/user';

interface props {
  data: UserDto;
  text: string;
}

export const AdminButton = (props: props) => {
  const { data, text } = props;
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);
  const user = useRecoilValue(userInfo);
  const URI = `/chat/groupChat/${roomInfo.groupChatId}/admin?userId=${user.id}&requestedId=${data.id}`;

  const handleAddAdmin = async (data: senderDTO) => {
    const res = await axiosInstance.post(URI);

    if (res.status === 200 || res.status === 201) {
      setRoomInfo({
        ...roomInfo,
        admin: [...roomInfo.admin, data],
        joinedUser: roomInfo.joinedUser.filter((item) => item.id !== data.id),
      });
    }
  };

  const handleDeleteAdmin = async (data: senderDTO) => {
    const res = await axiosInstance.delete(URI);

    if (res.status === 200 || res.status === 201) {
      setRoomInfo({
        ...roomInfo,
        admin: roomInfo.admin.filter((item) => item.id !== data.id),
        joinedUser: [...roomInfo.joinedUser, data],
      });
    }
  };

  return (
    <div className="flex w-28 h-8">
      <button
        className="flex w-full bg-progressBlue rounded-full text-white justify-center items-center mr-3"
        onClick={
          text === '관리자 등록'
            ? () => handleAddAdmin(data)
            : () => handleDeleteAdmin(data)
        }
      >
        {text}
      </button>
    </div>
  );
};
