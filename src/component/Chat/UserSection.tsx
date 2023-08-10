import { ServiceTitle } from '../Main/ServiceTitle';
import { StatusIcon } from '../FriendList/StatusIcon';
import { useNavigate } from 'react-router-dom';
import { Friend } from '../FriendList/Friend';
import { useRecoilValue } from 'recoil';
import { friendListState } from '../../atom/user';

export const UserSection = () => {
  const friendList = useRecoilValue(friendListState);

  const navigation = useNavigate();
  return (
    <div id="friends-section" className="flex-col flex h-full">
      <div className="flex">
        <ServiceTitle title="User" nonAddButton={true} />
      </div>
      <div className="flex flex-col w-full h-[50%] flex-grow px-10 rounded-3xl shadow-2xl">
        <div className="flex flex-row h-14 w-full justify-between mt-10 px-3">
          <StatusIcon props={{ status: 'online', color: 'bg-green-400' }} />
          <StatusIcon props={{ status: 'offline', color: 'bg-red-400' }} />
          <StatusIcon props={{ status: 'ingame', color: 'bg-blue-400' }} />
        </div>
        <div className="flex flex-col w-full h-full overflow-y-auto mt-3 mb-10">
          {friendList.map((item) => (
            <Friend key={item.id} props={item} />
          ))}
        </div>
        <div className="relative ">
          <img
            src={require('../../public/quit.png')}
            className=" mx-auto float-right mb-5 w-9 h-7"
            onClick={() => navigation('/')}
          ></img>
        </div>
      </div>
    </div>
  );
};
