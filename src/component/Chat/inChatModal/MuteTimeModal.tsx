import { useRecoilState } from 'recoil';
import { muteModalState } from '../../../atom/modal';
import { useState } from 'react';
import { RequestMuteDto } from '../../../interfaces/Chatting-Format.dto';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { closeModal } from '../../../utils/modalClose';

interface Props {
  groupChatId: number;
  userId: number;
  requestUserId: number;
}

export const MuteTimeModal = (props: Props) => {
  const [modal, setModal] = useRecoilState(muteModalState);
  const [timeUnit, setTimeUnit] = useState('');
  const [numberInput, setNumberInput] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const reqData: RequestMuteDto = {
      groupChatId: props.groupChatId,
      userId: props.userId,
      requestUserId: props.requestUserId,
      time: parseInt(numberInput, 10),
      unit: timeUnit,
    };
    ChatSocket.emit('mute-user', reqData);
    setModal(!modal);
  };

  return (
    <div
      aria-hidden={true}
      className="flex bg-[rgba(0,0,0,0.1)] items-center justify-center z-30 fixed top-0 left-0 w-full h-full"
      onClick={() => closeModal(modal, setModal)}
    >
      <div
        id="mute-content"
        className={`relative flex flex-col w-[20rem] h-[20rem] z-30 bg-white rounded-3xl shadow-lg items-center justify-center py-2`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flexw-full h-20 items-center justify-center font-medium text-gray-500 text-lg">
          set mute time
        </span>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col justify-center items-center"
        >
          <div className="flex w-[18rem] h-fulljustify-between p-2">
            <label className=" w-full h-20 flex flex-col justify-center items-center">
              time
              <input
                type="number"
                value={numberInput}
                max={100}
                min={1}
                onChange={(e) => setNumberInput(e.target.value)}
                className="flex h-8 w-24 outline-none p-2 rounded-full text-center mt-2 bg-sky"
              />
            </label>
            <label className=" w-full h-20 flex flex-col justify-center items-center">
              unit
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="flex h-8 w-24 outline-none rounded-full text-center mt-2  bg-sky"
              >
                <option value="">단위 선택</option>
                <option value="h">시</option>
                <option value="m">분</option>
                <option value="s">초</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="bg-progressBlue rounded-full h-10 w-20 font-semibold text-white shadow-sm mt-3"
          >
            확인
          </button>
        </form>
        <button
          id="modal-close-button"
          className="absolute top-3 right-3 p-0 text-gray-400 text-lg "
          onClick={() => closeModal(modal, setModal)}
        >
          X
        </button>
      </div>
    </div>
  );
};
