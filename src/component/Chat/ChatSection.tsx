import { ChatList } from './ChatList/ChatList';
import { ServiceTitle } from '../Main/ServiceTitle';
import { ChattingBubble } from './ChattingBubble';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChatSocket } from '../../sockets/ChatSocket';
import {
  ChatRoomInfoDTO,
  RequestGroupChatDTO,
  ResponseGroupChatDTO,
  ResponseFuncDto,
  fetchRequestGroupChatDTO,
  ResponseMuteDto,
} from '../../interfaces/Chatting-Format.dto';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userInfo } from '../../atom/user';
import { chatRoomState, currentChatInfoState } from '../../atom/chat';
import { Chat } from './Chat';

export const ChatSection = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ResponseGroupChatDTO[]>([]);
  const roomInfoReset = useResetRecoilState(currentChatInfoState);
  const [roomInfo, setRoomInfo] = useRecoilState(currentChatInfoState);
  const user = useRecoilValue(userInfo);
  const param = useParams().id;
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);
  const id = param === undefined ? 0 : parseInt(param, 10);

  useLayoutEffect(() => {
    ChatSocket.on('fetch-group-message', fetchMessageHandler);
    ChatSocket.on('group-message', sendMessageHandler);
    ChatSocket.on('kick-user', handleKick);
    ChatSocket.on('ban-user', handleBan);
    ChatSocket.on('block-user', handleBlock);
    ChatSocket.on('mute-user', handleMute);
    });

    if (chat.length === 0)
      ChatSocket.emit('fetch-group-message', requestFetchLog);

    return () => {
      ChatSocket.off('group-message', sendMessageHandler);
      ChatSocket.off('fetch-group-message', fetchMessageHandler);
      ChatSocket.off('kick-user', handleKick);
      ChatSocket.off('ban-user', handleBan);
      ChatSocket.off('block-user', handleBlock);
      ChatSocket.off('mute-user', handleMute);
    };
  }, [roomInfo]);

  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [chat]);

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
      //ban user render logic
    }
  };

  const handleMute = (data: ResponseMuteDto) => {
    
  }

  [Log] {groupChatId: 1, userId: 106930, chatSocketId: "lOwldAksF8C0ZqtDAABE", muteFor: 5000} (bundle.js, line 1885)


  const handleBlock = (data: ResponseFuncDto) => {
    console.log('조졌네');
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
        <div className="flex w-full mt-[2%] h-[80%] md:h-[800px] justify-between items-center px-14 z-10 overflow-y-auto">
          <div
            className="flex flex-col w-full h-full px-2 overflow-y-auto"
            ref={scrollBottomRef}
          >
            {chat.map((item) => (
              <ChattingBubble key={item.messageInfo.messageId} props={item} />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between w-full px-16 items-center mt-5 h-[6rem]">
          <input
            type="text"
            className="text-xl px-5 bottom-10 rounded-[50px] shadow-md w-[90%] h-[3rem] bg-[#D9D9D9] justify-center outline-none"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            value={input}
            autoFocus
          ></input>
          <div
            className="right-5 bottom-10 shadow-md h-[3rem] w-[6%] bg-[#D9D9D9] rounded-3xl"
            onClick={handleSendMessage}
          >
            <img
              src={require('../../public/whitePlane.png')}
              className=" mx-auto mt-2.5 w-7 h-7"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
