import { UserDto } from '../../interfaces/User.dto';
import {
  clickedFriendProfileState,
  clickedXState,
  clickedYState,
  friendProfileModalState,
} from '../../atom/modal';
import { useSetRecoilState } from 'recoil';
import { memo } from 'react';
import { RoleInChat } from '../../enum/role.enum';
import { GetFriendAdminButton } from './getter/GetFriendAdminButton';

export const Friend = memo(function Friend({
  props,
  adminButtonVisible,
  role = RoleInChat.user,
}: {
  props: UserDto;
  adminButtonVisible?: boolean;
  role: RoleInChat;
}) {
  const setX = useSetRecoilState(clickedXState);
  const setY = useSetRecoilState(clickedYState);
  const setClicked = useSetRecoilState(friendProfileModalState);
  const setFriendProfile = useSetRecoilState(clickedFriendProfileState);

  const ChatManageUserUtilComponent = GetFriendAdminButton({
    props,
    adminButtonVisible,
    role,
  });

  return (
    <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
      <div
        className="flex w-14 h-14 rounded-full border-2"
        // onclick으로 좌표랑 클릭된 애 누군지 recoil로 넘김
        onClick={(e) => {
          setX(e.clientX);
          setY(e.clientY);
          setFriendProfile(props);
          setClicked(true);
        }}
      >
        <img src={props.profile} className="flex rounded-full" />
      </div>
      <div className="flex w-1/2">
        <span className="text-gray-500 text-xl">{props.nickName}</span>
      </div>
      {ChatManageUserUtilComponent}
      <div
        className={`${
          props.status === 'online'
            ? 'bg-green-400'
            : props.status === 'offline'
            ? 'bg-red-400'
            : 'bg-blue-400 '
        } w-5 h-5 mr-3 rounded-full `}
      ></div>
    </div>
  );
});
