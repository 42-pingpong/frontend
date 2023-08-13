import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../atom/user';
import {
  RequestDirectMessageDTO,
  ResponseDirectMessageDTO,
  fetchRequestDirectMessageDTO,
} from '../../../interfaces/Chatting-Format.dto';
import { ChatSocket } from '../../../sockets/ChatSocket';
import { ServiceTitle } from '../../Main/ServiceTitle';
import { DirectMessageBubble } from './DirectMessageBubble';

export const DirectMessage = () => {
  const [input, setInput] = useState('');
  const [dm, setDm] = useState<ResponseDirectMessageDTO[]>([]);
  const user = useRecoilValue(userInfo);
  const id = useParams().id;
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handelDmResponse = (data: ResponseDirectMessageDTO) => {
      console.log(data);
      setDm((prev) => [...prev, data]);
    };

    const fetchMessageHandler = (
      data: ResponseDirectMessageDTO | ResponseDirectMessageDTO[]
    ) => {
      console.log(data);
      setDm((prev) =>
        Array.isArray(data) ? [...prev, ...data] : [...prev, data]
      );
    };

    if (id === undefined) return;

    const requestFetchLog: fetchRequestDirectMessageDTO = {
      userId: user.id,
      targetId: parseInt(id, 10),
    };

    ChatSocket.emit('fetch-direct-message', requestFetchLog);

    ChatSocket.on('fetch-direct-message', fetchMessageHandler);

    ChatSocket.on('direct-message', handelDmResponse);
    ChatSocket.on('error', (err) => {
      console.log('error');
      console.log(err);
    });

    return () => {
      ChatSocket.off('direct-message', handelDmResponse);
    };
  }, []);

  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [dm]);

  const handleSendDm = () => {
    if (input === '') return;
    if (id === undefined) return;

    const newDm: RequestDirectMessageDTO = {
      receiverId: parseInt(id, 10),
      senderId: user.id,
      message: input,
    };

    console.log(newDm);
    ChatSocket.emit('direct-message', newDm);
    setInput('');
  };

  return (
    <div
      id="dm-section"
      className="flex flex-col h-full max-w-[1800px] py-20 px-40"
    >
      <div className="flex">
        <ServiceTitle title="Direct Message" nonAddButton={true} />
      </div>
      <div className="flex relative h-[80vh] flex-col rounded-3xl shadow-2xl flex-grow pt-14 items-center">
        <div className="flex w-full h-[85%] md:h-[800px] justify-between items-center px-14 z-10 overflow-y-auto">
          <div
            className="flex flex-col w-full h-full px-2 overflow-y-auto"
            ref={scrollBottomRef}
          >
            {dm.map((item) => (
              <DirectMessageBubble key={item.directMessageId} props={item} />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between w-full px-16 items-center mt-5 h-[6rem]">
          <input
            type="text"
            className="text-xl px-5 bottom-10 rounded-[50px] shadow-md w-[90%] h-[3rem] bg-[#D9D9D9] justify-center outline-none"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendDm();
            }}
            value={input}
            autoFocus
          ></input>
          <div
            className="right-5 bottom-10 shadow-md h-[3rem] w-[6%] bg-[#D9D9D9] rounded-3xl"
            onClick={handleSendDm}
          >
            <img
              src={require('../../../public/whitePlane.png')}
              className=" mx-auto mt-2.5 w-7 h-7"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
