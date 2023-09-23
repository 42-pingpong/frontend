import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Friend } from '../../FriendList/Friend';
import { StatusIcon } from '../../FriendList/StatusIcon';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { UserDto } from '../../../interfaces/User.dto';
import { currentChatInfoState, roleState } from '../../../atom/chat';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { useNavigate, useParams } from 'react-router-dom';
import { DmButton } from './DmButton';
import { RoleUserList } from './RoleUserList';

export const UserList = ({
  owner,
  admin,
  joinedUser,
  bottomIconVisible,
}: {
  owner: UserDto | undefined;
  admin: UserDto[];
  joinedUser: UserDto[];
  bottomIconVisible: boolean;
}) => {
  const role = useRecoilValue(roleState);
  const navigation = useNavigate();
  const id = useParams().id;
  const roomInfoReset = useResetRecoilState(currentChatInfoState);
  const roomInfo = useRecoilValue(currentChatInfoState);

  const handleLeaveGroupChatRoom = () => {
    console.log('leave');
    ChatSocket.emit('leave-room', id);
    roomInfoReset();
    navigation('/');
  };

  const handleManageChatRoom = () => {
    navigation(`/chat-manage/${roomInfo.groupChatId}`);
  };

  return (
    <div id="friends-section" className="flex-col flex h-full w-full px-10">
      <div className="flex">
        <ServiceTitle title="User" nonAddButton={true} />
      </div>
      <div className="flex flex-col w-full h-full px-10 rounded-3xl shadow-2xl bg-slate-50">
        <div className="flex flex-row h-14 w-full justify-between mt-10 px-3">
          <StatusIcon props={{ status: 'online', color: 'bg-green-400' }} />
          <StatusIcon props={{ status: 'offline', color: 'bg-red-400' }} />
          <StatusIcon props={{ status: 'ingame', color: 'bg-blue-400' }} />
        </div>
        <div className="flex flex-col w-full h-[22%] mt-3 mb-2">
          <span className="font-semibold text-borderBlue text-lg">owner</span>
          {owner && (
            <Friend data={owner}>
              <DmButton item={owner} />
            </Friend>
          )}
        </div>
        <RoleUserList list={admin} role="admin" type="dm" />
        <RoleUserList list={joinedUser} role="user" type="dm" />
        <div>
          {role !== 'user' && bottomIconVisible && (
            <div className="opacity-20">
              <img
                src={require('../../../public/system.png')}
                className="mx-auto float-left mb-12 ml-3 w-8 h-8"
                onClick={handleManageChatRoom}
              ></img>
            </div>
          )}
          <div className="">
            <img
              src={require('../../../public/quit.png')}
              className=" mx-auto float-right mb-12 mr-3 w-9 h-7"
              onClick={handleLeaveGroupChatRoom}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
