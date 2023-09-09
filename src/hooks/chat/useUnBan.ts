import React, { useEffect, useState } from 'react';
import { ChatSocket } from '../../sockets/ChatSocket';
import {
  ResponseUnBanDto,
  senderDTO,
} from '../../interfaces/Chatting-Format.dto';

export default function useUnBan() {
  const [banList, setBanList] = useState<senderDTO[]>([]);

  useEffect(() => {
    ChatSocket.on('unban-user', handelUnBanUser);
    return () => {
      ChatSocket.off('unban-user');
    };
  }, []);

  const handelUnBanUser = (data: ResponseUnBanDto) => {
    setBanList((prev) => prev.filter((item) => item.id !== data.userId));
  };
  return { banList, setBanList };
}
