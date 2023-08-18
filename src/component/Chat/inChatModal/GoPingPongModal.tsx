import { useRecoilState, useRecoilValue } from 'recoil';
import { goPingPongModalState } from '../../../atom/modal';
import { useEffect, useState } from 'react';
import { GameSocket } from '../../../sockets/GameSocket';
import { ResponseGoPingPongDto } from '../../../interfaces/Chatting-Format.dto';
import { userInfo } from '../../../atom/user';
import { useNavigate } from 'react-router-dom';

interface playerInfoDto {
  // groupChatId: number;
  // userId: number;
  // userNickName: string;
  // targetUserId: number;
  // targetUserNickName: string;
  // isHost: boolean;
  id: number;
  is_host: boolean;
  play_number: number;
  enemy_id: number;
}

export const GoPingPongModal = ({
  props,
}: {
  props: ResponseGoPingPongDto;
}) => {
  const [modal, setModal] = useRecoilState(goPingPongModalState);
  const [isTarget, setIsTarget] = useState(false);
  const user = useRecoilValue(userInfo);
  const navigation = useNavigate();

  console.log('in go pingpong', props);

  useEffect(() => {
    if (props.targetUserId === user.id) setIsTarget(true);

    GameSocket.on('go-pingpong', (data) => {
      console.log;
    });

    GameSocket.on('go-pingpong-accept', (roomId: number) => {
      navigation(`/game/${roomId}}`);
    });

    return () => {
      GameSocket.off('go-pingpong');
    };
  }, []);

  const closeModal = (e: any) => {
    setModal(!modal);
  };

  const handleContentClick = (e: any) => {
    const modalCloseButton = document.getElementById('modal-close-button');

    if (e.target === modalCloseButton) setModal(!modal);
    e.stopPropagation();
  };

  const handleGoPingPong = () => {
    let playerInfo: playerInfoDto;
    isTarget
      ? (playerInfo = {
          id: user.id,
          is_host: false,
          play_number: 2,
          enemy_id: props.userId,
        })
      : (playerInfo = {
          id: user.id,
          is_host: true,
          play_number: 1,
          enemy_id: props.targetUserId,
        });
    GameSocket.emit('go-pingpong', playerInfo);
  };

  return (
    <div
      aria-hidden={true}
      className="flex bg-[rgba(0,0,0,0.1)] items-center justify-center z-30 fixed top-0 left-0 w-full h-full"
    >
      <div
        id="go-pingpong-content"
        className={`relative flex flex-col w-[20rem] h-[20rem] z-30 bg-white rounded-3xl shadow-lg items-center justify-center py-2`}
        onClick={handleContentClick}
      >
        {isTarget ? (
          <p className="px-10 break-keep flexw-full h-20 items-center justify-center font-medium text-gray-500 text-lg">
            {props.userNickName} 님과 게임을 하시겠습니까?
          </p>
        ) : (
          <span className="flexw-full h-20 items-center justify-center font-medium text-gray-500 text-lg">
            {props.targetUserNickName} 님의 응답 대기중
          </span>
        )}
        <div className="flex w-[18rem] justify-between p-2"></div>
        {isTarget ? (
          <div className="space-x-10">
            <button
              type="submit"
              className="bg-progressBlue rounded-full h-10 w-20 font-semibold text-white shadow-sm mt-3"
              onClick={() => {
                handleGoPingPong();
              }}
            >
              넹
            </button>
            <button
              type="submit"
              className="bg-progressBlue rounded-full h-10 w-20 font-semibold text-white shadow-sm mt-3"
            >
              시러여
            </button>{' '}
          </div>
        ) : null}
        <button
          id="modal-close-button"
          className="absolute top-3 right-3 p-0 text-gray-400 text-lg"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </div>
  );
};
