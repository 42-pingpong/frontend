import { UserDto } from '../../interfaces/User.dto';
import {
  clickedFriendProfileState,
  clickedXState,
  clickedYState,
  friendProfileModalState,
} from '../../atom/modal';
import { useSetRecoilState } from 'recoil';
import { memo } from 'react';

interface props {
  data: UserDto;
  children?: React.ReactNode;
}

export const Friend = memo(function Friend(props: props) {
  const setX = useSetRecoilState(clickedXState);
  const setY = useSetRecoilState(clickedYState);
  const setClicked = useSetRecoilState(friendProfileModalState);
  const setFriendProfile = useSetRecoilState(clickedFriendProfileState);
  const { data, children } = props;

  return (
    <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
      <div
        className="flex w-14 h-14 rounded-full border-2"
        onClick={(e) => {
          setX(e.clientX);
          setY(e.clientY);
          setFriendProfile(data);
          setClicked(true);
        }}
      >
        <img src={data.profile} className="flex rounded-full" />
      </div>
      <div className={`${children ? 'w-[35%]' : 'w-[70%]'}`}>
        <span className="text-gray-500 text-xl">{data.nickName}</span>
      </div>
      {children}
      <div
        className={`${
          data.status === 'online'
            ? 'bg-green-400'
            : data.status === 'offline'
            ? 'bg-red-400'
            : 'bg-blue-400 '
        } w-5 h-5 mr-3 rounded-full `}
      ></div>
    </div>
  );
});
