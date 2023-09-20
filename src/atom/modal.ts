import { atom } from 'recoil';
import { UserDto } from '../interfaces/User.dto';
import {
  ResponseGoPingPongDto,
  senderDTO,
} from '../interfaces/Chatting-Format.dto';

export const profileModalState = atom<boolean>({
  key: 'profileModalState',
  default: false,
});

export const notificationModalState = atom<boolean>({
  key: 'notificationModalState',
  default: false,
});

export const chattingProfileOnRightClickModalState = atom<boolean>({
  key: 'chattingProfileOnRightClickModalState',
  default: false,
});

export const chattingModalState = atom<boolean>({
  key: 'chattingModalState',
  default: false,
});

export const addUserModalState = atom<boolean>({
  key: 'addUserModalState',
  default: false,
});

export const muteModalState = atom<boolean>({
  key: 'muteModalState',
  default: false,
});

export const goPingPongModalState = atom<boolean>({
  key: 'goPingPongModalState',
  default: false,
});

export const goPingPongDtoState = atom<ResponseGoPingPongDto>({
  key: 'goPingPongDtoState',
  default: {
    groupChatId: -1,
    userId: -1,
    targetUserId: -1,
    userNickName: '',
    targetUserNickName: '',
  },
});

export const goPingPongRejectState = atom<string>({
  key: 'goPingPongRejectState',
  default: '',
});

export const goPingPongModeSelectModalState = atom<boolean>({
  key: 'goPingPongModeSelectState',
  default: false,
});

export const goPingPongModeState = atom<string>({
  key: 'goPingPongModeState',
  default: '',
});

export const goPingPongRequestedDataState = atom<ResponseGoPingPongDto>({
  key: 'goPingPongRequestedDataState',
  default: {
    groupChatId: -1,
    userId: -1,
    targetUserId: -1,
    userNickName: '',
    targetUserNickName: '',
    gameMode: '',
  },
});

export const friendProfileModalState = atom<boolean>({
  key: 'friendProfileModalState',
  default: false,
});

export const clickedXState = atom({
  key: 'x',
  default: -1000,
});

export const clickedYState = atom({
  key: 'y',
  default: -1000,
});

// Dto로 주길래 이렇게 넣어뒀는데 UserInfo랑 가지고 있는 정보 같아서 myProfile이랑 호환시키려면 이거 UserInfo로 바꾸면 될 듯 해염
export const clickedFriendProfileState = atom<UserDto>({
  key: 'clickedFriendProfile',
  default: {
    id: -1,
    level: -1,
    profile: '',
    email: '',
    nickName: '',
    fullName: '',
    selfIntroduction: '',
    status: '',
  },
});

export const clickedUserState = atom<senderDTO>({
  key: 'clickedUser',
  default: {
    id: -1,
    nickName: '',
    profile: '',
  },
});

export const passwordModalState = atom<boolean>({
  key: 'passwordModalState',
  default: false,
});

export const clickedRoomIdState = atom({
  key: 'clickedRoomNumber',
  default: '',
});

export const authenticationModalState = atom<boolean>({
  key: 'authenticationModalState',
  default: false,
});

export const gameModeModalState = atom<boolean>({
  key: 'gameModeModalState',
  default: false,
});
