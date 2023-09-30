import React, { memo, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { newMatching, playerNumberState, roomIdState } from '../../atom/game';
import {
  addUserModalState,
  chattingModalState,
  gameModeModalState,
} from '../../atom/modal';
import { loginState, userInfo } from '../../atom/user';
import { useNavigate } from 'react-router-dom';
import { GameSocket } from '../../sockets/GameSocket';

interface ServiceTitleProps {
  title: string;
  nonAddButton?: boolean;
}

export const ServiceTitle = memo((props: ServiceTitleProps) => {
  const [matching, setMatching] = useRecoilState(newMatching);
  const [chatstate, setChatstate] = useRecoilState(chattingModalState);
  const [addUser, setAddUser] = useRecoilState(addUserModalState);
  const [playerNum, setPlayerNum] = useRecoilState(playerNumberState);
  const user = useRecoilValue(userInfo);
  const navigation = useNavigate();
  const [roomId, setRoomId] = useRecoilState(roomIdState);
  const login = useRecoilValue(loginState);
  const SERVER = process.env.REACT_APP_SERVER;
  const [gameModeModal, setGameModeModal] = useRecoilState(gameModeModalState);

  const handleState = (roomName: number) => {
    setRoomId(roomName);
    setMatching(false);
    navigation(`/game/${roomName}`);
  };

  useEffect(() => {
    GameSocket.on('join', (roomName: number) => handleState(roomName));
    GameSocket.on('player-number', (data: number) => {
      if (data === 1) {
        setPlayerNum(1);
      } else {
        setPlayerNum(2);
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
      matching === false ? setGameModeModal(true) : setMatching(!matching);
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
});
