import React, { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addUserModalState } from '../../atom/modal';
import axiosInstance from '../../api/axios';
import { SearchUserList } from './SearchUser';
import { UserDto } from '../../interfaces/User.dto';
import { friendListState, userInfo } from '../../atom/user';

export const AddFriendModal = () => {
  const user = useRecoilValue(userInfo);
  const [addUser, setAddUser] = useRecoilState(addUserModalState);
  const [userList, setUserList] = useState<UserDto[]>([]);
  const inputNicknameRef = useRef('');
  const friendList = useRecoilValue(friendListState);

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('chattingroom-content');
    const modalListContent = document.getElementById('search-user-list');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (
      ((modalContent && modalContent.contains(e.target)) ||
        (modalListContent && modalListContent.contains(e.target))) &&
      e.target !== modalCloseButton
    )
      e.stopPropagation();
    else setAddUser(!addUser);
  };

  const isUserDuplicated = (user: UserDto) => {
    return friendList.some((item) => item.id === user.id);
  };

  const handelInputChange = (e: any) => {
    inputNicknameRef.current = e.target.value;
  };

  const excludeMeFriendList = (data: any) =>
    data.filter((item: UserDto) => item.id !== user.id);

  const userSearch = async () => {
    if (inputNicknameRef.current === '') return;
    const res = await axiosInstance.get(
      `/user/search?nickName=${inputNicknameRef.current}`
    );

    if (res.data !== undefined) {
      const searchList = excludeMeFriendList(res.data);
      if (searchList.length === 0) return; // 본인 닉네임 검색하면 안뜨게 해놨어요
      setUserList(searchList);
    }
  };

  return (
    <div className="background bg-[rgba(0,0,0,0.2)]" onClick={closeModal}>
      <div
        id="chattingroom-content"
        className="w-[22vw] h-[22vh] shadow-xl bg-[#F8F8F8] rounded-[30px] mx-auto align-middle justify-center relative z-10 mt-[20vh]"
      >
        <p className="py-[7%] px-[8%] font-sans not-italic font-[320]  text-[35px] leading-[41px] tracking-tighter text-[#5D777B]">
          Add Friend
        </p>

        <div className="relative h-[60%] grid">
          <div className="px-[8%] text-[#5D777B] text-2xl">
            <h1 className="pb-3 pl-8 font-light tracking-tight"> Member </h1>
            <input
              type="text"
              onChange={handelInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') userSearch();
              }}
              className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light outline-none"
            />
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
      {userList?.length != 0 && (
        <div
          id="search-user-list"
          className="flex flex-col w-[22vw] h-[45vh] shadow-xl px-12 py-16 bg-[#F8F8F8] rounded-[30px] mx-auto items-center justify-center relative z-10 mt-8"
        >
          <div className="overflow-y-auto w-full h-full inset-0 px-4">
            {userList.map((item) => (
              <SearchUserList
                key={item.id}
                props={item}
                isDuplicated={isUserDuplicated(item)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
