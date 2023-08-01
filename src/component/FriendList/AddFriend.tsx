import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { addUserModalState } from '../../atom/modal';
import axiosInstance from '../../api/axios';

export const AddFriend = () => {
  const [addUser, setAddUser] = useRecoilState(addUserModalState);
  const inputNicknameRef = useRef('');

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('chattingroom-content');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (
      modalContent &&
      modalContent.contains(e.target) &&
      e.target !== modalCloseButton
    )
      e.stopPropagation();
    else setAddUser(!addUser);
  };

  const handelInputCahnge = (e: any) => {
    inputNicknameRef.current = e.target.value;
  };

  const userSearch = async () => {
    const res = await axiosInstance.get(
      `/user/search?nickName=${inputNicknameRef.current}`
    );
    console.log(res);
  };

  return (
    <div className="background bg-[rgba(0,0,0,0.2)]" onClick={closeModal}>
      <div
        id="chattingroom-content"
        className="w-[25vw] h-[22vh] shadow-xl bg-[#F8F8F8] rounded-[30px] mx-auto align-middle justify-center relative z-10 mt-[10vh]"
      >
        <p className="py-[7%] px-[8%] font-sans not-italic font-[320]  text-[35px] leading-[41px] tracking-tighter text-[#5D777B]">
          Add Friend
        </p>

        <div className="relative h-[60%] grid">
          <div className="px-[8%] text-[#5D777B] text-2xl">
            <h1 className="pb-3 pl-8 font-light tracking-tight"> Member </h1>
            <input
              type="text"
              onChange={handelInputCahnge}
              className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light "
            ></input>
            <div className="flex justify-end" onClick={userSearch}>
              <img
                src={require('../../public/search.png')}
                className="right-[5%] bottom-9 w-6 h-6 relative"
              />
            </div>
          </div>
        </div>
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
