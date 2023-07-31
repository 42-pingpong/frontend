import React from 'react';
import { useRecoilState } from 'recoil';
import { newMatching } from '../../atom/game';
import { chattingModalState } from '../../atom/modal';

interface ServiceTitleProps {
  title: string;
}

export const ServiceTitle = (props: ServiceTitleProps) => {
  const [matching, setMatching] = useRecoilState(newMatching);
  const [chatstate, setChatstate] = useRecoilState(chattingModalState);

  return (
    <div className="flex h-full ml-5 items-center">
      <span className="text-bold text-[30px] md:text-[35px] text-gray-500">
        {props.title}
      </span>
      <img
        src={require('../../public/plus.png')}
        alt="plus-button"
        className="ml-2 mt-1 w-5 h-5 md:w-6 md:h-6 opacity-70"
        onClick={() =>
          props.title === 'Game'
            ? setMatching(!matching)
            : props.title === 'Chat'
            ? setChatstate(!chatstate)
            : null
        }
      />
    </div>
  );
};
