import { ChatList } from './ChatList/ChatList';
import { ServiceTitle } from '../Main/ServiceTitle';
import { ChattingBubble } from './ChattingBubble';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatSocket } from '../../sockets/ChatSocket';
import { ChatDTO, ChatRoomDTO } from '../../interfaces/Chatting-Format.dto';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo } from '../../atom/user';
import { chatRoomState } from '../../atom/chat';

export const ChatSection = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<ChatDTO[]>([]);
  const userInfoState = useRecoilValue(userInfo);
  const chatRoomList = useRecoilValue(chatRoomState);

  const data: ChatDTO[] = [];

  const id = useParams();

  useEffect(() => {
    const massageHandler = (data: ChatDTO) =>
      setChat((prev) => [...prev, data]);

    ChatSocket.emit('join-room', id.id?.toString());
    ChatSocket.on('chat-message', massageHandler);
    // ChatSocket.on('group-chat-info', (data: ChatRoomDTO) => {
    //   if (data === null || data === undefined || data.log === undefined) return;
    //   console.log('log', data.log);
    //   setChat(data.log);
    // });

    return () => {
      ChatSocket.off('chat-message', massageHandler);
      ChatSocket.off('group-chat-info');
      console.log('leave');
      ChatSocket.emit('leave-room', id.id);
    };
  }, []);

  const handleSendMessage = () => {
    if (input === '') return;

    const newChat: ChatDTO = {
      roomId: String(id.id),
      nickName: userInfoState.nickName,
      text: input,
    };

    console.log('newChat: ', newChat);

    ChatSocket.emit('chat-message', newChat, (chat: ChatDTO) => {
      setChat((prev) => {
        return [...prev, newChat];
      });
    });
    setInput('');
  };

  const chatRoom = chatRoomList.find((room) => room.roomId === Number(id.id));

  return (
    <div id="chat-section" className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Chat" nonAddButton={true} />
      </div>
      {chatRoom && (
        <div className="rounded-3xl mx-auto w-[500px] z-10">
          <ChatList props={chatRoom} />
        </div>
      )}
      <div className="flex h-full flex-col rounded-3xl shadow-2xl flex-grow pt-14 items-center">
        <div className="flex w-full h-[85%] md:h-[800px] justify-between items-center px-14 z-10 overflow-y-auto">
          <div className="flex flex-col w-full h-full px-2 overflow-y-auto">
            {chat.map((item) => (
              <ChattingBubble
                key={item.id}
                props={item}
                nickName={userInfoState.nickName}
              />
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
            onClick={() => handleSendMessage()}
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
