import { ServiceTitle } from '../../Main/ServiceTitle';
import { StatusIcon } from '../../FriendList/StatusIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { Friend } from '../../FriendList/Friend';
import { useRecoilValue } from 'recoil';
import { friendListState } from '../../../atom/user';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { currentChatInfoState } from '../../../atom/chat';

export const UserSection = () => {
  const currentChatInfo = useRecoilValue(currentChatInfoState);
  const navigation = useNavigate();
  const id = useParams().id;

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
        <div className="flex flex-col w-full h-full overflow-y-auto mt-3 mb-10">
          <span>owner</span>
          currentChatInfo.owner && <Friend props={currentChatInfo.owner} />
          {friendList.map((item) => (
            <Friend key={item.id} props={item} />
          ))}
        </div>
        <div className="relative">
          <img
            src={require('../../public/quit.png')}
            className=" mx-auto float-right mb-12 mr-3 w-9 h-7"
            onClick={handleLeaveGroupChatRoom}
          ></img>
        </div>
      </div>
    </div>
  );
};
