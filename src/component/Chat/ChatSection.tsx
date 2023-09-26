import { ChatList } from './ChatList/ChatList';
import { ServiceTitle } from '../Main/ServiceTitle';
import { ChattingBubble } from './ChattingBubble';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChatSocket } from '../../sockets/ChatSocket';
import {
  RequestGroupChatDTO,
  ResponseGroupChatDTO,
  ResponseFuncDto,
  fetchRequestGroupChatDTO,
  ResponseMuteDto,
  ResponseGoPingPongDto,
  goPingPongDto,
  ResponseUnBanDto,
} from '../../interfaces/Chatting-Format.dto';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { userInfo } from '../../atom/user';
import { currentChatInfoState } from '../../atom/chat';
import {
  chattingProfileOnRightClickModalState,
  goPingPongDtoState,
  goPingPongModalState,
  goPingPongModeSelectModalState,
  goPingPongRejectState,
  goPingPongRequestedDataState,
} from '../../atom/modal';
import { GameSocket } from '../../sockets/GameSocket';
import { GoPingPongModal } from './inChatModal/GoPingPongModal';
import useMuteTimeSave from '../../hooks/chat/useMuteTimeSave';
import useUnmute from '../../hooks/chat/useUnMute';
import { GoPingPongModeSelectModal } from './inChatModal/GoPingPongModeSelectModal';
import { paddleHeightState } from '../../atom/game';

export const ChatSection = () => {
  const navigate = useNavigate();
  const roomInfoReset = useResetRecoilState(currentChatInfoState);
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);
  const param = useParams().id;
  const id = param === undefined ? 0 : parseInt(param, 10);
  const user = useRecoilValue(userInfo);
  const { mute, setMute } = useMuteTimeSave();
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ResponseGroupChatDTO[]>([]);
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);
  const [isGoPingPongModalOpen, setIsGoPingPongModalOpen] =
    useRecoilState(goPingPongModalState);
  const setRightClickModal = useSetRecoilState(
    chattingProfileOnRightClickModalState
  );
  const setGoPingPongReject = useSetRecoilState(goPingPongRejectState);
  const unMuteMe = useUnmute();
  const isGoPingPongModeSelectModalOpen = useRecoilValue(
    goPingPongModeSelectModalState
  );
  const [goPingPongRequestedData, setGoPingPongRequestedData] = useRecoilState(
    goPingPongRequestedDataState
  );
  const setPaddleHeight = useSetRecoilState(paddleHeightState);

  useLayoutEffect(() => {
    ChatSocket.on('fetch-group-message', fetchMessageHandler);
    ChatSocket.on('group-message', sendMessageHandler);
    ChatSocket.on('kick-user', handleKick);
    ChatSocket.on('ban-user', handleBan);
    ChatSocket.on('block-user', handleBlock);
    ChatSocket.on('mute-user', handleMute);
    ChatSocket.on('go-pingpong', handleGoPingPong);
    ChatSocket.on('go-pingpong-accept', handleGoPingPongAccept);
    ChatSocket.on('go-pingpong-reject', handleGoPingPongReject);
    ChatSocket.on('unmute-user', handleUnMuteMe);

    if (chat.length === 0)
      ChatSocket.emit('fetch-group-message', requestFetchLog);

    return () => {
      ChatSocket.off('group-message', sendMessageHandler);
      ChatSocket.off('fetch-group-message', fetchMessageHandler);
      ChatSocket.off('kick-user', handleKick);
      ChatSocket.off('ban-user', handleBan);
      ChatSocket.off('block-user', handleBlock);
      ChatSocket.off('mute-user', handleMute);
      ChatSocket.off('go-pingpong', handleGoPingPong);
      ChatSocket.off('go-pingpong-accept', handleGoPingPongAccept);
      ChatSocket.off('go-pingpong-rejcet', handleGoPingPongReject);
      ChatSocket.on('unmute-user', handleUnMuteMe);
    };
  }, [roomInfo]);

  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [chat]);

  const handleUnMuteMe = (data: ResponseUnBanDto) => {
    if (user.id === data.userId) {
      setMute(false);
      localStorage.removeItem('mute');
    }
  };

  const handleKick = (data: ResponseFuncDto) => {
    if (data.userId === user.id) {
      ChatSocket.emit('leave-room', id);
      roomInfoReset();
      alert(`${id}번 방에서 쫒겨났습니다.`);
      navigate('/');
    } else {
      setRoomInfo((prev) => ({
        ...prev,
        joinedUser: prev.joinedUser.filter((item) => item.id !== data.userId),
      }));
    }
  };

  const handleBan = (data: ResponseFuncDto) => {
    if (data.userId === user.id) {
      ChatSocket.emit('leave-room', id);
      roomInfoReset();
      alert(`${id}번 방에서 밴 당했습니다.`);
      navigate('/');
    } else {
      setRoomInfo((prev) => ({
        ...prev,
        joinedUser: prev.joinedUser.filter((item) => item.id !== data.userId),
      }));
    }
  };

  const handleMute = (data: ResponseMuteDto) => {
    if (data.userId === user.id) {
      alert(`${data.muteFor / 1000}초 동안 뮤트되었습니다.`);
      const now = new Date();

      localStorage.setItem('mute', data.muteFor + now.getTime() + '');
      setMute(true);
      setTimeout(() => {
        localStorage.removeItem('mute');
        setMute(false);
      }, data.muteFor);
    }
  };

  const handleBlock = (data: ResponseFuncDto) => {
    console.log('조졌네');
  };

  const handleGoPingPong = async (data: ResponseGoPingPongDto) => {
    if (data.userId !== user.id && data.targetUserId !== user.id) return;
    const goPingPongData = {
      groupChatId: data.groupChatId,
      userId: data.userId,
      targetUserId: data.targetUserId,
      userNickName: data.userNickName,
      targetUserNickName: data.targetUserNickName,
      gameMode: data.gameMode,
    };
    if (data.userId === user.id) {
      {
        setGoPingPongRequestedData(() => goPingPongData);
        setIsGoPingPongModalOpen(true);
      }
    } else if (data.targetUserId === user.id) {
      setGoPingPongRequestedData(() => goPingPongData);
      setIsGoPingPongModalOpen(true);
    }
  };

  const handleGoPingPongAccept = (data: goPingPongDto) => {
    if (data.userId !== user.id && data.targetUserId !== user.id) return;
    user.id === data.userId
      ? GameSocket.emit('go-pingpong', data, true, 1, data.gameMode)
      : GameSocket.emit('go-pingpong', data, false, 2, data.gameMode);
    if (data.gameMode === 'HARD') setPaddleHeight(100);
    else setPaddleHeight(130);

    setIsGoPingPongModalOpen(false);
    setTimeout(() => {
      100;
    });
    setRightClickModal(false);
  };

  const handleGoPingPongReject = (response: any) => {
    if (response[0].userId !== user.id && response[0].targetUserId !== user.id)
      return;
    if (response[1] === 'N') {
      user.id === response[0].targetUserId
        ? setGoPingPongReject('거절했습니다')
        : setGoPingPongReject('거절당했습니다');
    } else if (user.id === response[0].targetUserId)
      setGoPingPongReject('취소했습니다');
    setRightClickModal(false);
  };

  const requestFetchLog: fetchRequestGroupChatDTO = {
    groupChatId: id,
    userId: user.id,
  };

  const sendMessageHandler = (data: ResponseGroupChatDTO) => {
    setChat((prev) => [...prev, data]);
  };

  const fetchMessageHandler = (
    data: ResponseGroupChatDTO | ResponseGroupChatDTO[]
  ) => {
    setChat((prev) =>
      Array.isArray(data) ? [...prev, ...data] : [...prev, data]
    );
  };

  const handleSendMessage = () => {
    if (input === '') return;
    if (id === undefined) return;
    const newChat: RequestGroupChatDTO = {
      receivedGroupChatId: id,
      senderId: user.id,
      message: input,
    };

    ChatSocket.emit('group-message', newChat);
    setInput('');
  };

  return (
    <div id="chat-section" className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Chat" nonAddButton={true} />
      </div>
      <div className="flex relative h-full flex-col rounded-3xl shadow-2xl flex-grow pt-14 items-center bg-slate-50">
        {roomInfo && (
          <div className="absolute top-[-4rem] left-1/2 transform -translate-x-1/2 rounded-3xl mx-auto w-[500px] z-10">
            <ChatList props={roomInfo} />
          </div>
        )}
        <div className="flex w-full pt-[2%] h-full max-h-full justify-center items-center px-14">
          <div
            className="flex absolute flex-col w-[90%] h-[80%] px-2 overflow-y-auto"
            ref={scrollBottomRef}
          >
            {chat.map((item) => (
              <ChattingBubble
                key={item.messageInfo.messageId}
                {...item.messageInfo}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between w-full px-16 items-center my-6">
          <input
            type="text"
            className="text-xl px-5 rounded-[50px] shadow-md w-[90%] h-[3rem] bg-[#D9D9D9] justify-center outline-none"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            value={input}
            disabled={mute}
            autoFocus
          ></input>
          <div
            className="right-5 shadow-md h-[3rem] w-[6%] bg-[#D9D9D9] rounded-3xl"
            onClick={handleSendMessage}
          >
            <img
              src={require('../../public/whitePlane.png')}
              className=" mx-auto mt-2.5 w-7 h-7"
            />
            {isGoPingPongModeSelectModalOpen && <GoPingPongModeSelectModal />}
            {isGoPingPongModalOpen && <GoPingPongModal />}
          </div>
        </div>
      </div>
    </div>
  );
};
