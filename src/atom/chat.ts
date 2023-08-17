import { atom, useRecoilValue } from 'recoil';
import {
  ChatRoomDTO,
  ChatRoomInfoDTO,
} from '../interfaces/Chatting-Format.dto';
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
    password: '',
  },
});

export const chatMemberListState = atom<UserDto[]>({
  key: 'chatMemberListState',
  default: [],
});

export const currentChatInfoState = atom<ChatRoomInfoDTO>({
  key: 'currentChatInfoState',
  default: {
    chatName: '',
    levelOfPublicity: '',
    curParticipants: 0,
    maxParticipants: 0,
    groupChatId: 0,
    password: '',
    owner: {
      id: 0,
      nickName: '',
      profile: '',
    },
    ownerId: 0,
    admin: [],
    joinedUser: [],
  },
});

export const roleState = atom<string>({
  key: 'roleState',
  default: '',
});
