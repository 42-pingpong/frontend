import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { gameModeModalState } from '../../atom/modal';
import { gameModeState, newMatching, paddleHeightState } from '../../atom/game';
import { userInfo } from '../../atom/user';
import { GameSocket } from '../../sockets/GameSocket';

export const GameModeModal = () => {
  const setModalOpen = useSetRecoilState(gameModeModalState);
  const [gameMode, setGameMode] = useRecoilState(gameModeState);
  const GAMEMODE = ['NORMAL', 'HARD'];
  const resetGameMode = useResetRecoilState(gameModeState);
  const setMatching = useSetRecoilState(newMatching);
  const user = useRecoilValue(userInfo);
  const setPaddleHeight = useSetRecoilState(paddleHeightState);

  const closeModal = () => {
    setModalOpen(false);
    resetGameMode();
  };

  const handleGameMode = (e: any) => {
    setGameMode(e.target.id);
  };

  const submitGameMode = () => {
    if (gameMode === '') {
      alert('게임 모드를 선택해주세요.');
      return;
    }
    setModalOpen(false);
    resetGameMode();
    setMatching(true);

    if (gameMode === 'NORMAL') {
      GameSocket.emit('normal-matching', user.id);
      setPaddleHeight(130);
    } else {
      GameSocket.emit('hard-matching', user.id);
      setPaddleHeight(100);
    }
  };

  return (
    <div
      aria-hidden={true}
      className="flex bg-[rgba(0,0,0,0.1)] items-center justify-center z-30 fixed top-0 left-0 w-full h-full"
    >
      <div
        id="game-mode-modal-content"
        className={`relative flex flex-col w-[20rem] h-[18rem] z-30 bg-white rounded-3xl shadow-lg items-center justify-center pb-2`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="px-10 break-keep flex w-full h-16 items-center justify-center font-medium text-gray-500 text-2xl">
          게임 모드를 선택하세요.
        </p>
        <div className="grid items-center w-full relative pb-5">
          <p className=" text-lg text-gray-500 px-auto justify-self-center">
            HARD
          </p>
          <p className="text-md text-gray-500 px-auto justify-self-center">
            - Paddle 길이가 짧아집니다.
          </p>
        </div>
        <div className="flex w-[18rem] justify-between px-8 p-2">
          {GAMEMODE.map((item, idx) => (
            <label key={idx}>
              <div className="checkbox inline-block text-gray-500 text-lg ">
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
        <button
          className="mt-5 px-3 text-white text-lg font-light bg-progressBlue rounded-full"
          onClick={submitGameMode}
        >
          매칭 참여하기
        </button>
        <button
          id="modal-close-button"
          className="absolute top-3 right-3 p-0 text-gray-400 text-lg"
          onClick={() => closeModal()}
        >
          X
        </button>
      </div>
    </div>
  );
};
