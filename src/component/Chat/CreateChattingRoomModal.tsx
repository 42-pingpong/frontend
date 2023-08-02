import React from 'react';
import { chattingModalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';

const roomtypeList = ['Public', 'Protected', 'Private'];

export const CreateChattingRoomModal = () => {
  const [chattingState, setChattingState] = useRecoilState(chattingModalState);

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('chattingroom-content');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (
      modalContent &&
      modalContent.contains(e.target) &&
      e.target !== modalCloseButton
    )
      e.stopPropagation();
    else setChattingState(!chattingState);
  };

  return (
    <div className="background bg-[rgba(0,0,0,0.2)]" onClick={closeModal}>
      <div
        id="chattingroom-content"
        className="min-w-[500px] w-[35vw] h-[65vh] shadow-xl bg-[#F8F8F8] rounded-[30px] mx-auto align-middle justify-center relative z-10 mt-[10vh]"
      >
        <p className="py-[7%] px-[8%] font-sans not-italic font-[320]  text-[35px] leading-[41px] tracking-tighter text-[#5D777B]">
          Create Chatting Room
        </p>

        <div className="pb-[6%] px-[8%] flex justify-center space-x-[5vw] text-[#5D777B] text-2xl font-light tracking-tight">
          {roomtypeList.map((item, idx) => (
            <div className="checkbox inline-block" key={idx}>
              <input
                type="radio"
                name="roomtype"
                id={item}
                className=" checked:bg-blue-500 "
              ></input>{' '}
              {item}
            </div>
          ))}
        </div>

        <div className="relative h-[60%] grid">
          <div className="px-[8%] text-[#5D777B] text-2xl">
            <h1 className="pb-3 font-light tracking-tight"> Title</h1>
            <input
              type="text"
              className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
            ></input>
          </div>

          <div className="px-[8%] text-[#5D777B] text-2xl relative">
            <h1 className="pb-3 font-light tracking-tight"> Max Participant</h1>
            <input
              type="number"
              min="1"
              max="1000"
              className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
            ></input>

            {/* 정원표시하는 텍스트 그냥 따로 빼서 위에 얹었어염 */}
            <p className=" text-[#5D777B] text-2xl absolute right-[15%] bottom-[6.4vh] font-light">
              / 1000
            </p>
          </div>

          <div className="px-[8%] text-[#5D777B] text-2xl">
            <h1 className="pb-3 font-light tracking-tight"> Member</h1>
            <input
              type="text"
              className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
            ></input>
          </div>
        </div>

        <button
          type="button"
          className="right-0  bg-[#FFAAAA] inline-block float-right mr-[10%] mb-[5%]"
        >
          <p className="font-sans not-italic font-[320]  text-[18px] leading-[41px] tracking-tighter text-[#5D777B]">
            방 만들기
          </p>
        </button>

        <button
          id="modal-close-button"
          className="absolute top-3 right-7 p-0 text-gray-400 text-lg"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </div>
  );
};
