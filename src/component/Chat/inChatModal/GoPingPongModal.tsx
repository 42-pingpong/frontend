import { useRecoilState, useRecoilValue } from 'recoil';
import { goPingPongDtoState, goPingPongModalState } from '../../../atom/modal';
import { useEffect, useState } from 'react';
import { GameSocket } from '../../../sockets/GameSocket';
import { ResponseGoPingPongDto } from '../../../interfaces/Chatting-Format.dto';
import { userInfo } from '../../../atom/user';
import { useNavigate } from 'react-router-dom';
import { ChatSocket } from '../../../sockets/ChatSocket';

export const GoPingPongModal = () => {
  const [modal, setModal] = useRecoilState(goPingPongModalState);
  const [isTarget, setIsTarget] = useState(false);
  const user = useRecoilValue(userInfo);
  const pingPong = useRecoilValue(goPingPongDtoState); // groupChatId, userId, targetUserId
  const navigation = useNavigate();

  useEffect(() => {
    if (pingPong.targetUserId === user.id) setIsTarget(true);

    GameSocket.on('go-pingpong', (roomId: number) => {
      // navigation(`/game/${roomId}}`);
      setModal(!modal);
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

  const submitPingPongResponse = (response: string) => {
    if (response === 'Y') {
      console.log('go-pingpong-accept', pingPong);
      ChatSocket.emit('go-pingpong-accept', {
        groupChatId: pingPong.groupChatId,
        userId: pingPong.userId,
        targetUserId: pingPong.targetUserId,
      });
    } else {
      ChatSocket.emit('go-pingpong-reject', {});
    }
    setModal(!modal);
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
            {pingPong.userNickName} 님과 게임을 하시겠습니까?
          </p>
        ) : (
          <span className="flexw-full h-20 items-center justify-center font-medium text-gray-500 text-lg">
            {pingPong.targetUserNickName} 님의 응답 대기중
          </span>
        )}
        <div className="flex w-[18rem] justify-between p-2"></div>
        {isTarget ? (
          <div className="space-x-10">
            <button
              type="submit"
              className="bg-progressBlue rounded-full h-10 w-20 font-semibold text-white shadow-sm mt-3"
              onClick={() => {
                submitPingPongResponse('Y');
              }}
            >
              넹
            </button>
            <button
              type="submit"
              className="bg-progressBlue rounded-full h-10 w-20 font-semibold text-white shadow-sm mt-3"
              onClick={() => {
                submitPingPongResponse('N');
              }}
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
