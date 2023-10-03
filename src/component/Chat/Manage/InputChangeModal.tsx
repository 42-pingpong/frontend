import React from 'react';
import { closeModal } from '../../../utils/modalClose';

export const enum changeType {
  PW_ADD,
  PW_CHANGE,
  TITLE_CHANGE,
}

interface props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  changeInput: () => void;
  changeType: changeType;
}

export const InputChangeModal = (props: props) => {
  const { setModalOpen, setInput, changeInput } = props;

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  const textArray = [
    {
      title: '비밀번호 추가',
      placeholder: '새로운 비밀번호를 입력해주세요.',
      button: '추가',
    },
    {
      title: '비밀번호 변경',
      placeholder: '변경할 비밀번호를 입력해주세요.',
      button: '변경',
    },
    {
      title: '방 제목 변경',
      placeholder: '변경할 방 제목을 입력해주세요.',
      button: '변경',
    },
  ];

  const text = textArray[props.changeType];

  return (
    <div
      className="flex background bg-[rgba(0,0,0,0.2)] justify-center items-center"
      onClick={() => closeModal(true, setModalOpen)}
    >
      <div
        className="flex w-[25vw] h-[20vh] min-w-[300px] bg-white justify-center items-center flex-col rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex text-gray-400 text-lg mb-6 font-semibold">
          {text.title}
        </span>
        <input
          type="text"
          placeholder={text.placeholder}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              changeInput();
            }
          }}
          className="w-[80%] h-[3rem] rounded-3xl bg-[#ebebeb] outline-none text-center shadow-md"
        />
        <button
          onClick={() => (changeInput(), closeModal(true, setModalOpen))}
          className="w-16 h-8 bg-progressBlue rounded-full text-white mt-6"
        >
          {text.button}
        </button>
      </div>
    </div>
  );
};
