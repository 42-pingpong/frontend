import { Friend } from '../../FriendList/Friend';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { senderDTO } from '../../../interfaces/Chatting-Format.dto';
import { StatusIcon } from '../../FriendList/StatusIcon';
import { RoleUserList } from '../User/RoleUserList';

interface props {
  owner: senderDTO;
  admin: senderDTO[];
  joinedUser: senderDTO[];
}

export const UserList = (props: props) => {
  const { owner, admin, joinedUser } = props;

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
        <RoleUserList list={admin} role="admin" type="adminManage" />
        <RoleUserList list={joinedUser} role="user" type="adminManage" />
      </div>
    </div>
  );
};
