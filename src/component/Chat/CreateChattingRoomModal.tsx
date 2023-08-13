import React, { useEffect, useRef, useState } from 'react';
import { chattingModalState } from '../../atom/modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatSocket } from '../../sockets/ChatSocket';
import { userInfo } from '../../atom/user';
import axiosInstance from '../../api/axios';
import { UserDto } from '../../interfaces/User.dto';
import {
  chatMemberListState,
  chatRoomState,
  createChatRoomState,
} from '../../atom/chat';
import { ChatRoomDTO } from '../../interfaces/Chatting-Format.dto';
import { ChatSearchUserList } from './ChatSearchUser';
import { ChatMembersModal } from './ChatMembersModal';

const roomtypeList = ['Public', 'Protected', 'Private'];

export const CreateChattingRoomModal = () => {
  const [chattingState, setChattingState] = useRecoilState(chattingModalState);
  const user = useRecoilValue(userInfo);
  const [userList, setUserList] = useState<UserDto[]>([]);
  const memberRef = useRef('');
  const [memberFocus, setMemberFocus] = useState(false);
  const setChatRoomList = useSetRecoilState(chatRoomState);
  const [formValue, setFormValue] = useRecoilState(createChatRoomState);
  const [chatMembers, setChatMembers] = useRecoilState(chatMemberListState);

  useEffect(() => {
    setFormValue({ ...formValue, ownerId: user.id });
  }, []);

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('chattingroom-content');
    const modalCloseButton = document.getElementById('modal-close-button');
    const searchUserList = document.getElementById('search-user-list');
    const memberList = document.getElementById('member-list');

    if (
      ((modalContent && modalContent.contains(e.target)) ||
        (searchUserList && searchUserList.contains(e.target)) ||
        (memberList && memberList.contains(e.target))) &&
      e.target !== modalCloseButton
    ) {
      e.stopPropagation();
    } else setChattingState(!chattingState);
  };

  const isUserDuplicated = (user: UserDto) => {
    if (formValue.participants === undefined) return false;
    return formValue.participants?.some((item) => item === user.id);
  };

  const handleRoomtype = (e: any) => {
    let roomtype: string;

    if (e.target.id === 'Public') roomtype = 'Pub';
    else if (e.target.id === 'Protected') roomtype = 'Prot';
    else roomtype = 'Priv';
    setFormValue((prev) => ({ ...prev, levelOfPublicity: roomtype }));
  };

  const handleOnChange = (e: any) => {
    if (e.target.name === 'maxParticipants') {
      if (e.target.value > 10) {
        alert('최대 참여 인원은 10명입니다.');
        return;
      }
      if (e.target.value < 1) {
        alert('최소 참여 인원은 1명입니다.');
        return;
      }
      setFormValue((prev) => ({
        ...prev,
        [e.target.name]: parseInt(e.target.value, 10),
      }));
    } else {
      setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const excludeMeFriendList = (data: any) =>
    data.filter((item: UserDto) => item.id !== user.id);

  const userSearch = async () => {
    console.log(memberRef.current);
    if (memberRef.current === '') return;
    const res = await axiosInstance.get(
      `/user/search?nickName=${memberRef.current}`
    );

    if (res.data !== undefined) {
      const searchList: UserDto[] = excludeMeFriendList(res.data);
      if (searchList.length === 0) {
        setUserList([]);
        return;
      }
      setUserList(searchList);
    }
  };

  const handleRefChange = (e: any) => {
    memberRef.current = e.target.value;
  };

  const handleSubmit = () => {
    console.log(formValue);

    if (formValue.chatName === '') {
      alert('채팅방 이름을 입력해주세요.');
      return;
    }
    if (formValue.maxParticipants === 0) {
      alert('최대 참여 인원을 입력해주세요.');
      return;
    }
    ChatSocket.emit('create-room', formValue, (res: ChatRoomDTO) => {
      setChatRoomList((prev) => [...prev, res]);
    });
    setChattingState(!chattingState);
  };

  return (
    <div className="background bg-[rgba(0,0,0,0.2)]" onClick={closeModal}>
      <div
        id="chattingroom-content"
        className="min-w-[500px] w-[30vw] h-[65vh] shadow-xl bg-[#F8F8F8] rounded-[30px] mx-auto align-middle justify-center relative z-10 mt-[10vh] grid grid-cols-1 grid-rows-4"
      >
        <div className="grid-rows-1">
          <p className="py-[7%] px-[8%]  font-sans font-[320]  text-[35px] leading-[41px] tracking-tighter text-[#5D777B] pb-10">
            Create Chatting Room
          </p>
          <div className="pb-[6%] px-[8%] flex justify-center space-x-[5vw] text-[#5D777B] text-2xl font-light tracking-tight">
            {roomtypeList.map((item, idx) => (
              <label key={idx}>
                <div className="checkbox inline-block">
                  <input
                    name="levelOfPublicity"
                    type="radio"
                    id={item}
                    className=" checked:bg-sky "
                    onClick={(e) => handleRoomtype(e)}
                  ></input>{' '}
                  {item}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="relative row-span-3 grid gap-10">
          <div className="px-[8%] text-[#5D777B] text-2xl ">
            <h1 className="pb-3 font-light tracking-tight"> Title</h1>
            <input
              name="chatName"
              type="text"
              className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
              onChange={(e) => handleOnChange(e)}
            ></input>
          </div>

          {formValue.levelOfPublicity !== 'Priv' ? (
            <div className="px-[8%] text-[#5D777B] text-2xl relative ">
              <h1 className="pb-3 font-light tracking-tight">
                Max Participant
              </h1>
              <input
                name="maxParticipants"
                type="number"
                min={2}
                max={10}
                placeholder="You can invite up to 10 people"
                className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
                onChange={(e) => handleOnChange(e)}
              />
            </div>
          ) : (
            <></>
          )}
          {formValue.levelOfPublicity !== 'Priv' ? (
            <div className="px-[8%] text-[#5D777B] text-2xl relative ">
              <h1 className="pb-3 font-light tracking-tight"> Member</h1>
              <input
                id="member"
                name="member"
                type="text"
                className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
                onChange={(e) => {
                  handleRefChange(e);
                }}
                onFocus={() => {
                  setMemberFocus(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    userSearch();
                  }
                }}
              ></input>
            </div>
          ) : (
            <></>
          )}

          {formValue.levelOfPublicity === 'Prot' ? (
            <div className="px-[8%] text-[#5D777B] text-2xl">
              <h1 className="pb-3 font-light tracking-tight"> Password </h1>
              <input
                name="password"
                type="text"
                className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
                onChange={(e) => handleOnChange(e)}
              ></input>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="grid-rows-end">
          <button
            type="button"
            className="right-0  inline-block float-right mr-[10%] mb-[5%]"
            onClick={() => handleSubmit()}
          >
            <p className="font-sans not-italic font-[320] text-2xl leading-[41px] tracking-tighter text-[#5D777B]">
              Create
            </p>
          </button>
        </div>

        <button
          id="modal-close-button"
          className="absolute top-3 right-7 p-0 text-gray-400 text-lg"
          onClick={closeModal}
        >
          X
        </button>
      </div>
      {userList?.length != 0 && memberFocus && (
        <div
          id="search-user-list"
          className="flex absolute flex-col top-[46vh] left-[68vw] w-[17vw] h-[30vh] shadow-xl px-12 pb-10 pt-5 bg-[#F8F8F8] rounded-[30px] mx-auto items-center justify-center  z-10"
        >
          <span className="flex justify-center w-full items-center font-bold text-3xl text-borderBlue">
            search members
          </span>
          <div className="overflow-y-auto w-full h-full inset-0 px-4">
            {userList.map((item) => (
              <ChatSearchUserList
                key={item.id}
                props={item}
                isDuplicated={isUserDuplicated(item)}
              />
            ))}
          </div>
        </div>
      )}
      {chatMembers.length != 0 && memberFocus && (
        <div
          id="member-list"
          className="flex absolute flex-col top-[11vh] left-[68vw] w-[17vw] h-[30vh] shadow-xl px-12 pb-10 pt-5 bg-[#F8F8F8] rounded-[30px] mx-auto items-center justify-center z-10"
        >
          <span className="flex justify-center w-full items-center font-bold text-3xl text-borderBlue">
            invited members
          </span>
          <div className="overflow-y-auto w-full h-full inset-0 px-4">
            {chatMembers.map((item) => (
              <ChatMembersModal key={item.id} props={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
