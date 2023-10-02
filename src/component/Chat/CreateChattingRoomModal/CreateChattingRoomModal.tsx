import React, { useEffect, useRef, useState } from 'react';
import { chattingModalState } from '../../../atom/modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { userInfo } from '../../../atom/user';
import axiosInstance from '../../../api/axios';
import { UserDto } from '../../../interfaces/User.dto';
import { ChatRoomDTO } from '../../../interfaces/Chatting-Format.dto';
import { Public } from './component/Public';
import { Protected } from './component/Protected';
import { RoomTypeRadio } from './component/RoomTypeRadio';
import { SearchMemberModal } from './modal/SearchMemberModal';
import { excludeMeFriendList } from '../../../utils/createChatUtils';
import { closeModal } from '../../../utils/modalClose';
import {
  chatMemberListState,
  chatRoomState,
  createChatRoomState,
} from '../../../atom/chat';
import { CreateGroupchatDto } from '../../../interfaces/Groupchat-Create.dto';

export const CreateChattingRoomModal = () => {
  const [chattingState, setChattingState] = useRecoilState(chattingModalState);
  const user = useRecoilValue(userInfo);
  const [userList, setUserList] = useState<UserDto[]>([]);
  const memberRef = useRef('');
  const [memberFocus, setMemberFocus] = useState(false);
  const setChatRoomList = useSetRecoilState(chatRoomState);
  const [formValue, setFormValue] = useRecoilState(createChatRoomState);
  const chatMembers = useRecoilValue(chatMemberListState);

  useEffect(() => {
    setFormValue({ ...formValue, ownerId: user.id });
  }, []);

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

  const userSearch = async () => {
    if (memberRef.current === '') return;

    const res = await axiosInstance.get(
      `/user/search?nickName=${memberRef.current}`
    );

    if (res.data !== undefined) {
      const searchList: UserDto[] = excludeMeFriendList(res.data, user.id);
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
    if (formValue.chatName === '') {
      alert('채팅방 이름을 입력해주세요.');
      return;
    }
    if (
      formValue.levelOfPublicity !== 'Priv' &&
      formValue.maxParticipants === 0
    ) {
      alert('최대 참여 인원을 입력해주세요.');
      return;
    }

    ChatSocket.emit('create-room', formValue, (res: ChatRoomDTO) => {
      setChatRoomList((prev) => [...prev, res]);
    });
    setChattingState(!chattingState);
  };

  const handlePrivateSubmit = () => {
    const privateForm: CreateGroupchatDto = {
      chatName: formValue.chatName,
      levelOfPublicity: 'Pub',
      maxParticipants: 1,
      ownerId: user.id,
      participants: [],
    };

    ChatSocket.emit('create-room', privateForm, (res: ChatRoomDTO) => {
      setChatRoomList((prev) => [...prev, res]);
    });
    setChattingState(!chattingState);
  };

  return (
    <div
      className="background bg-[rgba(0,0,0,0.2)]"
      onClick={() => closeModal(chattingState, setChattingState)}
    >
      <div
        id="chattingroom-content"
        className="min-w-[500px] w-[30vw] h-[65vh] min-h-[800px] shadow-xl bg-[#F8F8F8] rounded-[30px] mx-auto align-middle justify-center relative z-10 mt-[10vh] grid grid-cols-1 grid-rows-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid-rows-1">
          <p className="py-[7%] px-[8%]  font-sans font-[320]  text-[35px] leading-[41px] tracking-tighter text-[#5D777B] pb-10">
            Create Chatting Room
          </p>
          <RoomTypeRadio handleRoomtype={handleRoomtype} />
        </div>
        <div className="relative row-span-3 grid gap-10">
          <div className="px-[8%] text-[#5D777B] text-2xl ">
            <h1 className="pb-3 font-light tracking-tight"> Title</h1>
            <input
              name="chatName"
              type="text"
              className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          {formValue.levelOfPublicity === 'Pub' && (
            <Public
              handleOnChange={handleOnChange}
              handleRefChange={handleRefChange}
              userSearch={userSearch}
              setMemberFocus={setMemberFocus}
            />
          )}
          {formValue.levelOfPublicity === 'Prot' && (
            <Protected
              handleOnChange={handleOnChange}
              handleRefChange={handleRefChange}
              userSearch={userSearch}
              setMemberFocus={setMemberFocus}
            />
          )}
        </div>
        <div className="grid-rows-end">
          <button
            type="button"
            className="right-0  inline-block float-right mr-[10%] mb-[5%]"
            onClick={
              formValue.levelOfPublicity === 'Priv'
                ? handlePrivateSubmit
                : handleSubmit
            }
          >
            <p className="font-sans not-italic font-[320] text-2xl leading-[41px] tracking-tighter text-[#5D777B]">
              Create
            </p>
          </button>
        </div>
        <button
          id="modal-close-button"
          className="absolute top-3 right-7 p-0 text-gray-400 text-lg"
          onClick={() => closeModal(chattingState, setChattingState)}
        >
          X
        </button>
      </div>
      {userList.length != 0 && memberFocus && (
        <SearchMemberModal
          userList={userList}
          topPosition={46}
          modalName={'search members'}
        />
      )}
      {chatMembers.length != 0 && memberFocus && (
        <SearchMemberModal
          userList={chatMembers}
          topPosition={11}
          modalName={'invited members'}
        />
      )}
    </div>
  );
};
