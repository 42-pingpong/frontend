import React, { useEffect, useState } from 'react';
import { ChatSocket } from '../../sockets/ChatSocket';
import {
  MutedUserDto,
  ResponseUnBanDto,
} from '../../interfaces/Chatting-Format.dto';

export default function useUnmute() {
  const [muteList, setMuteList] = useState<MutedUserDto[]>([]);

  useEffect(() => {
    ChatSocket.on('unmute-user', handelUnmuteUser);
    return () => {
      ChatSocket.off('unmute-user');
    };
  }, []);

  const handelUnmuteUser = (data: ResponseUnBanDto) => {
    setMuteList((prev) => prev.filter((item) => item.id !== data.userId));
  };
  return { muteList, setMuteList };
}
