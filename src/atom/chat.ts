import { atom } from 'recoil';
import { ChatRoomDTO } from '../interfaces/Chatting-Format.dto';

export const chatRoomState = atom<ChatRoomDTO[]>({
  key: 'chatRoomState',
  default: [],
});

export const currentRoomIdState = atom<number>({
  key: 'currentRoomIdState',
  default: 1,
});
