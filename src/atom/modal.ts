import { atom } from 'recoil';
import { ResponseGoPingPongDto } from '../interfaces/Chatting-Format.dto';

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
