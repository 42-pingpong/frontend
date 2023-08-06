import { ChatList } from './ChatList/ChatList';
import { ServiceTitle } from '../Main/ServiceTitle';
import { ChattingBubble } from './ChattingBubble';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatSocket } from '../../sockets/ChatSocket';
import { IChat } from '../../interfaces/Chatting-Format.dto';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfo } from '../../atom/user';
import { chatRoomState } from '../../atom/chat';

export const ChatSection = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<IChat[]>([]);
  const userInfoState = useRecoilValue(userInfo);
  const chatRoomList = useRecoilValue(chatRoomState);

  const data: IChat[] = [];

  useEffect(() => {
    const massageHandler = (data: IChat) => setChat((prev) => [...prev, data]);

    ChatSocket.connect();
    ChatSocket.on('chat-message', massageHandler);

    return () => {
      ChatSocket.disconnect();
      ChatSocket.off('chat-message', massageHandler);
    };
  }, []);

  const handleSendMessage = () => {
    if (input === '') return;

    const newChat: IChat = {
      nickName: userInfoState.nickName,
      text: input,
    };

    console.log('newChat: ', newChat);

    ChatSocket.emit('chat-message', newChat, (chat: IChat) => {
      setChat((prev) => {
        return [...prev, newChat];
      });
    });
    setInput('');
  };

  const id = useParams();
  console.log(id);

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
      <div className="rounded-3xl shadow-xl h-[50%] flex-grow relative flex justify-center">
        <div className="w-full h-[85%] justify-between overflow-y-auto py-3 items-center z-10">
          {chat.map((item) => (
            <ChattingBubble
              key={item.id}
              props={item}
              nickName={userInfoState.nickName}
            />
          ))}
        </div>
        <input
          type="text"
          className="text-xl absolute px-5 bottom-10 rounded-[50px] shadow-lg w-[80%] h-[3rem] bg-[#D9D9D9] justify-center"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          value={input}
          autoFocus
        ></input>
        <div
          className="absolute right-5 bottom-10 shadow-lg h-[3rem] w-[6%] bg-[#D9D9D9] rounded-3xl"
          onClick={() => handleSendMessage()}
        >
          <img
            src={require('../../public/whitePlane.png')}
            className=" mx-auto mt-2.5 w-7 h-7"
          ></img>
        </div>
      </div>
    </div>
  );
};
