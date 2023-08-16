import { atom } from 'recoil';
import { UserDto } from '../interfaces/User.dto';
import { senderDTO } from '../interfaces/Chatting-Format.dto';

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
