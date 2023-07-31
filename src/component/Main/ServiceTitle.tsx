import React from 'react';
import { useRecoilState } from 'recoil';
import { newMatching } from '../../atom/game';
import { addUserModalState, chattingModalState } from '../../atom/modal';
import { addUserState } from '../../atom/user';

interface ServiceTitleProps {
  title: string;
}

export const ServiceTitle = (props: ServiceTitleProps) => {
  const [matching, setMatching] = useRecoilState(newMatching);
  const [chatstate, setChatstate] = useRecoilState(chattingModalState);
  const [addUser, setAddUser] = useRecoilState(addUserModalState);

  console.log(props.title);

  return (
    <div className="flex h-full ml-5 items-center">
      <span className="text-bold text-[35px] text-gray-500">
        {' '}
        {props.title}{' '}
      </span>
      <img
        src={require('../../public/plus.png')}
        alt="plus-button"
        className="ml-2 mt-1 w-6 h-6 opacity-70"
        onClick={() =>
          props.title === 'Game'
            ? setMatching(!matching)
            : props.title === 'Chat'
            ? setChatstate(!chatstate)
            : props.title === 'Friends'
            ? setAddUser(!addUser)
            : null
        }
      />
    </div>
  );
};
