import { useRecoilState, useRecoilValue } from 'recoil';
import {
  goPingPongDtoState,
  goPingPongModalState,
  goPingPongRejectState,
  goPingPongRequestedDataState,
} from '../../../atom/modal';
import { useEffect, useState } from 'react';
import { GameSocket } from '../../../sockets/GameSocket';
import { userInfo } from '../../../atom/user';
import { useNavigate } from 'react-router-dom';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { closeModal } from '../../../utils/modalClose';

export const GoPingPongModal = () => {
  const [modal, setModal] = useRecoilState(goPingPongModalState);
  const [isTarget, setIsTarget] = useState(false);
  const user = useRecoilValue(userInfo);
  const pingPong = useRecoilValue(goPingPongDtoState); // groupChatId, userId, targetUserId
  const navigation = useNavigate();
  const [goPingPongReject, setGoPingPongReject] = useRecoilState(
    goPingPongRejectState
  );
  const reqData = useRecoilValue(goPingPongRequestedDataState);
  const gameMode =
    reqData.gameMode === 'NORMAL' ? ' 일반 모드 ' : ' 어려움 모드 ';

  useEffect(() => {
    if (reqData.targetUserId === user.id) setIsTarget(true);

    GameSocket.on('go-pingpong', (roomId: number) => {
      navigation(`/game/${roomId}}`);
      setModal(!modal);
    });

    return () => {
      GameSocket.off('go-pingpong');
      setGoPingPongReject('');
    };
  }, []);

  const submitPingPongResponse = (response: string) => {
    if (response === 'Y') {
      ChatSocket.emit('go-pingpong-accept', {
        groupChatId: reqData.groupChatId,
        userId: reqData.userId,
        targetUserId: reqData.targetUserId,
        gameMode: reqData.gameMode,
      });
      setModal(!modal);
    } else {
      ChatSocket.emit('go-pingpong-reject', reqData, response);
    }
  };

  // 거절당했을 때 따로 렌더링
  if (goPingPongReject) {
    return (
      <div
        aria-hidden={true}
        className="flex bg-[rgba(0,0,0,0.1)] items-center justify-center z-30 fixed top-0 left-0 w-full h-full"
      >
        <div
          id="go-pingpong-content"
          className={`relative flex flex-col w-[20rem] h-[20rem] z-30 bg-white rounded-3xl shadow-lg items-center justify-center py-2`}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="px-10 break-keep flex w-full h-20 items-center justify-center font-medium text-gray-500 text-lg">
            {goPingPongReject}
          </p>

          <div className="flex w-[18rem] justify-between p-2"></div>

          <button
            id="modal-close-button"
            className="absolute top-3 right-3 p-0 text-gray-400 text-lg"
            onClick={() => closeModal(modal, setModal)}
          >
            X
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden={true}
      className="flex bg-[rgba(0,0,0,0.1)] items-center justify-center z-30 fixed top-0 left-0 w-full h-full"
    >
      <div
        id="go-pingpong-content"
        className={`relative flex flex-col w-[20rem] h-[20rem] z-30 bg-white rounded-3xl shadow-lg items-center justify-center py-2`}
        onClick={(e) => e.stopPropagation()}
      >
        {isTarget ? (
          <p className="px-10 break-keep flexw-full h-20 items-center justify-center font-medium text-gray-500 text-lg">
            {reqData.userNickName} 님과 {gameMode} 게임을 하시겠습니까?
          </p>
        ) : (
          <span className="flexw-full h-20 items-center justify-center font-medium text-gray-500 text-lg">
            {reqData.targetUserNickName} 님의 응답 대기중
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
        {isTarget ? null : (
          <button
            id="modal-close-button"
            className="absolute top-3 right-3 p-0 text-gray-400 text-lg"
            onClick={() => submitPingPongResponse('X')}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};
