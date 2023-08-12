import { atom, useRecoilValue } from 'recoil';
import { ChatRoomDTO } from '../interfaces/Chatting-Format.dto';
import { CreateGroupchatDto } from '../interfaces/Groupchat-Create.dto';
import { UserDto } from '../interfaces/User.dto';

export const chatRoomState = atom<ChatRoomDTO[]>({
  key: 'chatRoomState',
  default: [],
});

export const dmRoomState = atom<ChatRoomDTO[]>({
  key: 'dmRoomState',
  default: [],
});

export const currentRoomIdState = atom<number>({
  key: 'currentRoomIdState',
  default: 1,
});

export const createChatRoomState = atom<CreateGroupchatDto>({
  key: 'createChatRoomState',
  default: {
    chatName: '',
    levelOfPublicity: 'Pub',
    maxParticipants: 0,
    ownerId: 0,
    participants: [],
  },
});

export const chatMemberListState = atom<UserDto[]>({
  key: 'chatMemberListState',
  default: [],
});
