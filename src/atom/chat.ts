import { atom } from 'recoil';
import { IChatRoom } from '../interfaces/Chatting-Format.dto';

export const chatRoomState = atom<IChatRoom[]>({
  key: 'chatRoomState',
  default: [],
});

export const currentRoomIdState = atom<number>({
  key: 'currentRoomIdState',
  default: 1,
});
