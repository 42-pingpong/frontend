import { useRecoilState, useRecoilValue } from 'recoil';
import { passwordModalState } from '../../../atom/modal';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatSocket } from '../../../sockets/ChatSocket';
import {
  ChatRoomInfoDTO,
  JoinGroupChatDTO,
} from '../../../interfaces/Chatting-Format.dto';
import { userInfo } from '../../../atom/user';
import { Chat } from '../Chat';
import { currentChatInfoState } from '../../../atom/chat';

export const PasswordModal = ({ groupChatId }: { groupChatId: string }) => {
  const [password, setPassword] = useRecoilState(passwordModalState);
  const inputPasswordRef = useRef('');
  const navigation = useNavigate();
  const user = useRecoilValue(userInfo);
  const [curRoomInfo, setCurRoomInfo] = useRecoilState(currentChatInfoState);

  useEffect(() => {
    ChatSocket.on('join-room', handleJoinChatRoom);
    ChatSocket.on('error', handleJoinChatRoomError);
  }, []);

  const handleJoinChatRoom = (data: ChatRoomInfoDTO) => {
    // 얘도 고쳐라
    setCurRoomInfo(data);
    setPassword(false);
    navigation(`/chat/${data.groupChatId}`);
  };

  const handleJoinChatRoomError = (data: any) => {
    alert('비밀번호가 틀렸습니다.');
    inputPasswordRef.current = '';
  };

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('password-content');
    const modalListContent = document.getElementById('search-user-list');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (
      ((modalContent && modalContent.contains(e.target)) ||
        (modalListContent && modalListContent.contains(e.target))) &&
      e.target !== modalCloseButton
    )
      e.stopPropagation();
    else setPassword(!password);
  };

  const handleInputChange = (e: any) => {
    inputPasswordRef.current = e.target.value;
  };

  const handlePassword = (e: any) => {
    const requestJoinChatRoom: JoinGroupChatDTO = {
      groupChatId: parseInt(groupChatId, 10),
      userId: user.id,
      password: inputPasswordRef.current,
    };
    console.log(requestJoinChatRoom);
    ChatSocket.emit('join-room', requestJoinChatRoom);
  };

  return (
    <div className="background bg-[rgba(0,0,0,0.2)]" onClick={closeModal}>
      <div
        id="password-content"
        className="w-[22vw] h-[22vh] shadow-xl bg-[#F8F8F8] rounded-[30px] mx-auto align-middle justify-center relative z-10 mt-[20vh]"
      >
        <p className="py-[7%] px-[8%] font-sans not-italic font-[320]  text-[35px] leading-[41px] tracking-tighter text-[#5D777B]">
          Protected Room
        </p>

        <div className="relative h-[45%] ">
          <div className="px-[8%] text-[#5D777B] text-2xl">
            <h1 className="pb-3 pl-8 font-light tracking-tight"> Password </h1>
            <input
              type="text"
              onChange={handleInputChange}
              className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light "
            ></input>
          </div>
        </div>
        <button
          id="modal-close-button"
          className="absolute top-3 right-7 p-0 text-gray-400 text-lg"
          onClick={closeModal}
        >
          X
        </button>
        <button
          className=" text-[#5D777B]  float-right mx-10 divide-x-6 "
          onClick={handlePassword}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
