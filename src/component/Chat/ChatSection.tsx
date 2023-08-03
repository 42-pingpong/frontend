import { ChatList } from './ChatList/ChatList';
import { ServiceTitle } from '../Main/ServiceTitle';
import { Chatting } from './Chatting';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export interface chatForm {
  id: number;
  nickname: string;
  text: string;
  sender: string;
}

export const ChatSection = () => {
  const input = useRef('');
  const [reset, setReset] = useState('');
  const data: chatForm[] = [
    {
      id: 1,
      nickname: 'nick1',
      text: '안녕하세요',
      sender: 'jina',
    },
    {
      id: 2,
      nickname: 'nick1',
      text: '요즘너무더워요',
      sender: 'me',
    },
    {
      id: 3,
      nickname: 'nick1',
      text: '잉잉잉잉',
      sender: 'jina',
    },
    {
      id: 4,
      nickname: 'nick1',
      text: '저녁뭐먹지',
      sender: 'me',
    },
    {
      id: 5,
      nickname: 'nick1',
      text: '순두부찌개끌려요',
      sender: 'jina',
    },
    {
      id: 6,
      nickname: 'nick1',
      text: '냠냠냠냠',
      sender: 'jina',
    },
    {
      id: 7,
      nickname: 'nick1',
      text: '노트북도뜨거워요',
      sender: 'jina',
    },
    {
      id: 8,
      nickname: 'nick1',
      text: '잉잉잉잉',
      sender: 'jina',
    },
  ];

  const handleSendMessage = () => {
    console.log(input.current);
    input.current = '';
    setReset('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    input.current = e.target.value;
    setReset(e.target.value);
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
          {data.map((item) => (
            <Chatting key={item.id} props={item} />
          ))}
        </div>
        <input
          type="text"
          className="text-xl absolute px-5 bottom-10 rounded-[50px] shadow-lg w-[80%] h-[3rem] bg-[#D9D9D9] justify-center"
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          value={reset}
        ></input>
        <div className="absolute right-0 bottom-10 shadow-lg w-12  h-[3rem] bg-[#D9D9D9] rounded-3xl">
          <img
            src={require('../../public/whitePlane.png')}
            className=" mx-auto my-auto absolute"
            onClick={() => handleSendMessage()}
          ></img>
        </div>
      </div>
    </div>
  );
};
