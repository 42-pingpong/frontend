import { atom } from 'recoil';
import { GetFriendResponseDto } from '../interfaces/Get-Friend.dto';

export const loginState = atom<boolean>({
  key: 'loginState',
  default: false,
});

export const userInfo = atom({
  key: 'userInfo',
  default: {
    id: -1,
    nickName: '',
    email: '',
    fullName: '',
    profile: '',
    selfIntroduction: '',
    level: 0,
  },
});

export const friendList = atom<GetFriendResponseDto[]>({
  key: 'friendList',
  default: [],
});
