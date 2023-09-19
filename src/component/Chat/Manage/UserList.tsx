import { Friend } from '../../FriendList/Friend';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';
import { StatusIcon } from '../../FriendList/StatusIcon';
import axiosInstance from '../../../api/axios';
import { useRecoilState } from 'recoil';
import { currentChatInfoState } from '../../../atom/chat';

interface props {
  owner: senderDTO;
  admin: senderDTO[];
  joinedUser: senderDTO[];
  roomId: number;
  userId: number;
}

export const UserList = (props: props) => {
  const { owner, admin, joinedUser, roomId, userId } = props;
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);

  const handleAddAdmin = async (data: senderDTO) => {
    const uri = `/chat/groupChat/${roomId}/admin?userId=${userId}&requestedId=${data.id}`;
    const res = await axiosInstance.post(uri);

    if (res.status === 200 || res.status === 201) {
      setRoomInfo({
        ...roomInfo,
        admin: [...roomInfo.admin, data],
        joinedUser: roomInfo.joinedUser.filter((item) => item.id !== data.id),
      });
    }
  };

  const handleDeleteAdmin = async (data: senderDTO) => {
    const uri = `/chat/groupChat/${roomId}/admin?userId=${userId}&requestedId=${data.id}`;
    const res = await axiosInstance.delete(uri);

    if (res.status === 200 || res.status === 201) {
      setRoomInfo({
        ...roomInfo,
        admin: roomInfo.admin.filter((item) => item.id !== data.id),
        joinedUser: [...roomInfo.joinedUser, data],
      });
    }
  };

  return (
    <div className="flex-col flex w-full h-full px-10">
      <div className="flex">
        <ServiceTitle title={`User`} nonAddButton={true} />
      </div>
      <div className="flex flex-col w-full h-full px-10 rounded-3xl shadow-2xl bg-slate-50">
        <div className="flex flex-row h-14 w-full justify-between mt-10 px-3">
          <StatusIcon props={{ status: 'online', color: 'bg-green-400' }} />
          <StatusIcon props={{ status: 'offline', color: 'bg-red-400' }} />
          <StatusIcon props={{ status: 'ingame', color: 'bg-blue-400' }} />
        </div>
        <div className="flex flex-col w-full h-[22%] mt-3 mb-2">
          <span className="font-semibold text-borderBlue text-lg">owner</span>
          {owner && <Friend data={owner} />}
        </div>
        <span className="font-semibold text-gray-500 text-lg">admin</span>
        <div className="flex flex-col w-full h-[30%] flex-grow overflow-y-auto mt-3 mb-2">
          {admin &&
            admin.map((item) => (
              <Friend key={item.id} data={item}>
                <div className="flex w-20 h-6">
                  <button
                    className="flex bg-progressBlue rounded-full ml-3"
                    onClick={() => handleDeleteAdmin(item)}
                  >
                    관리자 해제
                  </button>
                </div>
              </Friend>
            ))}
        </div>
        <span className="font-semibold text-gray-500 text-lg">user</span>
        <div className="flex flex-col w-full h-[30%] flex-grow overflow-y-auto mt-3 mb-2">
          {joinedUser &&
            joinedUser.map((item) => (
              <Friend key={item.id} data={item}>
                <div className="flex w-20 h-6">
                  <button
                    className="flex bg-progressBlue rounded-full ml-3"
                    onClick={() => handleAddAdmin(item)}
                  >
                    관리자 등록
                  </button>
                </div>
              </Friend>
            ))}
        </div>
      </div>
    </div>
  );
};
