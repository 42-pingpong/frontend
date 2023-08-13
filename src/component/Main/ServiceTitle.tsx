import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { newMatching, playerNumber } from '../../atom/game';
import { addUserModalState, chattingModalState } from '../../atom/modal';
import { loginState, userInfo } from '../../atom/user';
import { useNavigate } from 'react-router-dom';
import { GameSocket } from '../../sockets/GameSocket';

interface ServiceTitleProps {
  title: string;
  nonAddButton?: boolean;
}

export const ServiceTitle = (props: ServiceTitleProps) => {
  const [matching, setMatching] = useRecoilState(newMatching);
  const [chatstate, setChatstate] = useRecoilState(chattingModalState);
  const [addUser, setAddUser] = useRecoilState(addUserModalState);
  const [playerNum, setPlayerNum] = useRecoilState(playerNumber);
  const user = useRecoilValue(userInfo);
  const navigation = useNavigate();
  const login = useRecoilValue(loginState);
  const SERVER = process.env.REACT_APP_SERVER;

  useEffect(() => {
    GameSocket.on('join', (roomName: string) => {
      console.log('join ', roomName);

      setMatching(false);
      navigation('/game/' + roomName);
    });
    GameSocket.on('player-number', (data: number) => {
      if (data === 1) {
        setPlayerNum(1);
        // GameSocket.emit('player1-id', user.id);
      } else {
        setPlayerNum(2);
        // GameSocket.emit('player2-id', user.id);
      }
    });
    return () => {
      GameSocket.off('join');
      GameSocket.off('player-number');
    };
  }, []);

  const handlePlus = () => {
    if (login === false) {
      alert('로그인이 필요합니다.');
      window.location.href = SERVER + '/auth/42/login';
      return;
    }
    if (props.title === 'Game') {
      setMatching(!matching), GameSocket.emit('enter-queue', user.id);
    } else if (props.title === 'Chat') {
      setChatstate(!chatstate);
    } else if (props.title === 'Friends') {
      setAddUser(!addUser);
    }
  };

  return (
    <div className="flex h-full ml-5 items-center">
      <span className="text-bold text-[30px] md:text-[35px] text-gray-500">
        {props.title}
      </span>
      {props?.nonAddButton !== true ? (
        <img
          src={require('../../public/plus.png')}
          alt="plus-button"
          className="ml-2 mt-1 w-5 h-5 md:w-6 md:h-6 opacity-70"
          onClick={handlePlus}
        />
      ) : (
        <span></span>
      )}
    </div>
  );
};
