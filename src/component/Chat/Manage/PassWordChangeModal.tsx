import React from 'react';

interface props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPassWord: React.Dispatch<React.SetStateAction<string>>;
  changePassword: () => void;
}

export const PassWordChangeModal = (props: props) => {
  const { setModalOpen, setPassWord, changePassword } = props;
  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePassWordInput = (e: any) => {
    setPassWord(e.target.value);
  };

  return (
    <div
      className="flex background bg-[rgba(0,0,0,0.2)] justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="flex w-[25vw] h-[20vh] min-w-[300px] bg-white justify-center items-center flex-col rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex text-gray-400 text-lg mb-6 font-semibold">
          비밀번호 변경
        </span>
        <input
          type="text"
          placeholder="변경할 비밀번호를 입력해주세요."
          onChange={handlePassWordInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              changePassword();
            }
          }}
          className="w-[80%] h-[3rem] rounded-3xl bg-[#ebebeb] outline-none text-center shadow-md"
        />
        <button
          onClick={changePassword}
          className="w-16 h-8 bg-progressBlue rounded-full text-white mt-6"
        >
          변경
        </button>
      </div>
    </div>
  );
};
