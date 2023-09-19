import React from 'react';
import { UserDto } from '../../../interfaces/User.dto';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../atom/user';

interface props {
  item: UserDto;
}

export const DmButton = (props: props) => {
  const user = useRecoilValue(userInfo);
  const navigation = useNavigate();

  const handleDirectMessage = (id: number) => {
    //socket emit
    if (id === user.id) return;
    navigation(`/direct-message/${id}`);
  };

  return (
    <div className="flex w-10 h-6">
      <img
        src={require('../../../public/plane.png')}
        className="ml-3"
        onClick={() => handleDirectMessage(props.item.id)}
      />
    </div>
  );
};
