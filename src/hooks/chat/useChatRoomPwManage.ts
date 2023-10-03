import React, { useState } from 'react';
import axiosInstance from '../../api/axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentChatInfoState } from '../../atom/chat';

export default function useChatRoomPwManage() {
  const [passWord, setPassWord] = useState<string>('');
  const [passWordModal, setPassWordModal] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);
  const [changeRoomTitleModal, setChangeRoomTitleModal] = useState(false);
  const [title, setTitle] = useState<string>('');

  const changePassword = async () => {
    if (passWord.length < 1) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    const updateRoomInfo = {
      password: passWord,
      levelOfPublicity: 'Prot',
    };

    const res = await axiosInstance.patch(
      `/chat/groupChat/${roomInfo.groupChatId}`,
      updateRoomInfo
    );

    if (res.status === 200 || res.status === 201) {
      setPassWord('');
      setPassWordModal(false);
      setRoomInfo({
        ...roomInfo,
        curPassword: passWord,
        levelOfPublicity: 'Prot',
      });
      alert('비밀번호가 변경되었습니다.');
    }
  };

  const deletePassword = async () => {
    const updateRoomInfo = {
      levelOfPublicity: 'Pub',
    };

    const res = await axiosInstance.patch(
      `/chat/groupChat/${roomInfo.groupChatId}`,
      updateRoomInfo
    );

    if (res.status === 200 || res.status === 201) {
      setPassWord('');
      setPassWordModal(false);
      if (roomInfo.levelOfPublicity === 'Prot')
        setRoomInfo({ ...roomInfo, levelOfPublicity: 'Pub' });
      alert('비밀번호가 삭제되었습니다.');
    }
  };

  const changeRoomTitle = async () => {
    const updateRoomInfo = {
      chatName: title,
    };

    const res = await axiosInstance.patch(
      `/chat/groupChat/${roomInfo.groupChatId}`,
      updateRoomInfo
    );

    if (res.status === 200 || res.status === 201) {
      setRoomInfo({ ...roomInfo, chatName: title });
      alert('방 제목이 변경되었습니다.');
    }
  };

  return {
    changePassword,
    deletePassword,
    setPassWord,
    passWordModal,
    setPassWordModal,

    changeRoomTitle,
    changeRoomTitleModal,
    setChangeRoomTitleModal,
    setTitle,
  };
}
