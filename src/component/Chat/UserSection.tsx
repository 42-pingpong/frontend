import { ServiceTitle } from '../Main/ServiceTitle';
import { StatusIcon } from '../UserList/StatusIcon';

export const UserSection = () => {
  return (
    <div id="friends-section" className="flex-col flex h-full">
      <div className="flex">
        <ServiceTitle title="User" />
      </div>

      <div className="md:h-20 w-60"></div>

      <div className="flex flex-col w-full h-[50%] flex-grow px-10 rounded-3xl shadow-2xl">
        <div className="flex flex-row h-14 w-full justify-between mt-10 px-3">
          <StatusIcon props={{ status: 'online', color: 'bg-green-400' }} />
          <StatusIcon props={{ status: 'offline', color: 'bg-red-400' }} />
          <StatusIcon props={{ status: 'ingame', color: 'bg-blue-400' }} />
        </div>
        {/*<div className="flex flex-col w-full h-full overflow-y-auto mt-3 mb-10">
          {userData.map((item) => (
            <User key={item.id} props={item} />
          ))}
        </div>*/}
      </div>
    </div>
  );
};
