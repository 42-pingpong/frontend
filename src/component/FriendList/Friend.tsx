import { UserDto } from '../../interfaces/User.dto';
import { memo, useState } from 'react';
import { FriendProfileModal } from './FriendProfileModal';

interface props {
  data: UserDto;
  children?: React.ReactNode;
}

export const Friend = memo(function Friend(props: props) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [modal, setModal] = useState(false);
  const { data, children } = props;

  return (
    <>
      <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
        <div
          className="flex w-14 h-14 rounded-full border-2"
          onClick={(e) => {
            setX(e.clientX);
            setY(e.clientY);
            setModal(true);
          }}
        >
          <img src={data.profile} className="flex rounded-full w-14 h-14" />
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
        />
      </div>
      {modal && (
        <FriendProfileModal
          user={data}
          x={x > 300 ? x - 550 : x}
          y={y > 900 ? y - 100 : y}
          onClosed={() => setModal(false)}
        />
      )}
    </>
  );
});
