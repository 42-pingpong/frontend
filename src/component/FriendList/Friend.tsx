import { UserDto } from '../../interfaces/User.dto';
import {
  clickedFriendProfileState,
  clickedXState,
  clickedYState,
  friendProfileModalState,
} from '../../atom/modal';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export const Friend = ({ props }: { props: UserDto }) => {
  const setX = useSetRecoilState(clickedXState);
  const setY = useSetRecoilState(clickedYState);
  const setClicked = useSetRecoilState(friendProfileModalState);
  const setFriendProfile = useSetRecoilState(clickedFriendProfileState);
  const navigation = useNavigate();
  return (
    <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
      <div
        className="w-14 h-14 rounded-full border-2"
        // onclick으로 좌표랑 클릭된 애 누군지 recoil로 넘김
        onClick={(e) => {
          setX(e.clientX);
          setY(e.clientY);
          setFriendProfile(props);
          setClicked(true);
        }}
      >
        <img src={require('../../public/soo.png')} />
      </div>
      <div className="flex w-1/2">
        <span className="text-gray-500 text-xl">{props.nickName}</span>
      </div>
      <div className="flex w-10 h-6">
        <img
          src={require('../../public/plane.png')}
          className="ml-3"
          onClick={() => navigation(`/chat/${props.nickName}`)}
        />
      </div>
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
};
