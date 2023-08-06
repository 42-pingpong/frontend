import { ChatList } from './ChatList/ChatList';
import { ServiceTitle } from '../Main/ServiceTitle';
import { ChattingBubble } from './ChattingBubble';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatSocket } from '../../sockets/ChatSocket';
import { IChat } from '../../interfaces/Chatting-Format.dto';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../atom/user';

export const ChatSection = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<IChat[]>([]);
  const userInfoState = useRecoilValue(userInfo);

  // const data: IChat[] = [
  //   {
  //     id: 1,
  //     nickname: 'nick1',
  //     text: '안녕하세요',
  //     sender: 'jina',
  //   },
  //   {
  //     id: 2,
  //     nickname: 'nick1',
  //     text: '요즘너무더워요',
  //     sender: 'me',
  //   },
  //   {
  //     id: 3,
  //     nickname: 'nick1',
  //     text: '잉잉잉잉',
  //     sender: 'jina',
  //   },
  //   {
  //     id: 4,
  //     nickname: 'nick1',
  //     text: '저녁뭐먹지',
  //     sender: 'me',
  //   },
  //   {
  //     id: 5,
  //     nickname: 'nick1',
  //     text: '순두부찌개끌려요',
  //     sender: 'jina',
  //   },
  //   {
  //     id: 6,
  //     nickname: 'nick1',
  //     text: '냠냠냠냠',
  //     sender: 'jina',
  //   },
  //   {
  //     id: 7,
  //     nickname: 'nick1',
  //     text: '노트북도뜨거워요',
  //     sender: 'jina',
  //   },
  //   {
  //     id: 8,
  //     nickname: 'nick1',
  //     text: '잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉잉',
  //     sender: 'jina',
  //   },
  // ];

  const data: IChat[] = [];

  useEffect(() => {
    console.log('ChatSocket connect');
    ChatSocket.connect();

    const massageHandler = (data: IChat) => setChat((prev) => [...prev, data]);

    ChatSocket.on('chat-message', massageHandler);

    return () => {
      console.log('ChatSocket disconnect');
      ChatSocket.off('chat-message', massageHandler);
      ChatSocket.disconnect();
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

  // const params = useParams();
  // console.log(params);

  // params 써서 방 정보 불러오는 거 필요할 것 같아염 ~

  return (
    <div id="chat-section" className="flex flex-col h-full">
      <div className="flex">
        <ServiceTitle title="Chat" nonAddButton={true} />
      </div>
      <div className="rounded-3xl mx-auto w-[500px] z-10">
        <ChatList
          key="1"
          props={{
            id: 1,
            title: '채팅방1',
            people: 2,
            maxPeople: 4,
            permission: 'public',
          }}
        />
      </div>

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

// /goinfre/jinkim2/data/backend/src/sockets/chat/chat.gateway.ts
//   @SubscribeMessage('chat-message')
//   handleMessage(client: any, ...payload: IChat[]): any {
//     client.broadcast.emit('chat-message', payload[0]);
//     return payload[0];
//   }
// }
