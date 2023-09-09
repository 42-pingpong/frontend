import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../atom/user';
import {
  ResponseDirectMessageDTO,
  fetchRequestDirectMessageDTO,
  RequestDirectMessageDTO,
} from '../../interfaces/Chatting-Format.dto';
import { ChatSocket } from '../../sockets/ChatSocket';

export default function useDirectMessage(id: number) {
  const [input, setInput] = useState('');
  const [dm, setDm] = useState<ResponseDirectMessageDTO[]>([]);
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    ChatSocket.emit('fetch-direct-message', requestFetchLog);
    ChatSocket.on('fetch-direct-message', fetchMessageHandler);
    ChatSocket.on('direct-message', handelDmResponse);

    return () => {
      ChatSocket.off('direct-message', handelDmResponse);
      ChatSocket.off('fetch-direct-message', fetchMessageHandler);
    };
  }, []);

  const handelDmResponse = (data: ResponseDirectMessageDTO) => {
    setDm((prev) => [...prev, data]);
  };

  const fetchMessageHandler = (
    data: ResponseDirectMessageDTO | ResponseDirectMessageDTO[]
  ) => {
    setDm((prev) =>
      Array.isArray(data) ? [...prev, ...data] : [...prev, data]
    );
  };

  const requestFetchLog: fetchRequestDirectMessageDTO = {
    userId: user.id,
    targetId: id,
  };

  const handleSendDm = () => {
    if (input === '') return;
    if (id === undefined) return;

    const newDm: RequestDirectMessageDTO = {
      receiverId: id,
      senderId: user.id,
      message: input,
    };

    ChatSocket.emit('direct-message', newDm);
    setInput('');
  };

  return { input, setInput, dm, handleSendDm };
}
