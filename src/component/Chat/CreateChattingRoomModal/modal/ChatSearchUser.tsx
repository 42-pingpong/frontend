import { memo } from 'react';
import { UserDto } from '../../../../interfaces/User.dto';

interface Props {
  user: UserDto;
  isInvited: boolean;
  handleOnClick: (user: UserDto) => void;
  image: string;
}

export const ChatSearchUser = memo((props: Props) => {
  const { user, isInvited, handleOnClick, image } = props;

  return (
    <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
      <div className="w-14 h-14 rounded-full border-2">
        <img src={user.profile} className="w-14 h-14 rounded-full" />
      </div>
      <div className="flex w-1/2">
        <span className="text-gray-500 text-xl">{user.nickName}</span>
      </div>
      <div
        className={`${
          user.status === 'online'
            ? 'bg-green-400'
            : user.status === 'offline'
            ? 'bg-red-400'
            : 'bg-blue-400 '
        } w-5 h-5 mr-3 rounded-full `}
      />
      <div className="flex w-10 h-6">
        <img
          src={require(`../../../../public/${image}.png`)}
          className="opacity-50"
          onClick={() => handleOnClick(user)}
        />
      </div>
    </div>
  );
});
