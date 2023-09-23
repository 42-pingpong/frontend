import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  goPingPongModalState,
  goPingPongModeSelectModalState,
  goPingPongRequestedDataState,
} from '../../../atom/modal';
import { useEffect, useState } from 'react';
import { ChatSocket } from '../../../sockets/ChatSocket';

export const GoPingPongModeSelectModal = () => {
  const setGoPingPongModeSelectModal = useSetRecoilState(
    goPingPongModeSelectModalState
  );
  const mode = ['NORMAL', 'HARD'];
  const [gameMode, setGameMode] = useState('');
  const [reqData, setReqData] = useRecoilState(goPingPongRequestedDataState);
  const setGoPingPongModal = useSetRecoilState(goPingPongModalState);
  // const func = useResetRecoilState(goPingPongRequestedDataState);

  // useEffect(() => {
  //   return () => func();
  // }, []);

  const handleGameMode = (e: any) => {
    setGameMode(e.target.id);
    setReqData({ ...reqData, gameMode: e.target.id });
  };

  const closeModal = () => {
    setGoPingPongModeSelectModal(false);
  };

  const submitGameMode = () => {
    closeModal();
    setGoPingPongModal(true);
    ChatSocket.emit('go-pingpong', reqData);
  };

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
          {reqData.targetUserNickName} 님과 진행할 게임 모드를 선택해주세요.
        </p>
        <div className="flex">
          {mode.map((item, idx) => (
            <label key={idx}>
              <div className="checkbox inline-block text-gray-500 text-lg mx-4 ">
                <input
                  name="levelOfPublicity"
                  type="radio"
                  id={item}
                  className=" checked:bg-sky"
                  onClick={(e) => handleGameMode(e)}
                />
                {item}
              </div>
            </label>
          ))}
        </div>

        <div className="flex w-[18rem] justify-between p-2"></div>
        <button
          // type="submit"
          className="bg-progressBlue rounded-full h-10 w-20 font-semibold text-white shadow-sm mt-3"
          onClick={() => {
            submitGameMode();
          }}
        >
          쨰리기
        </button>
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
