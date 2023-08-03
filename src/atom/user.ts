import { atom } from 'recoil';
import { UserDto } from '../interfaces/User.dto';

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

export const friendList = atom<UserDto[]>({
  key: 'friendList',
  default: [],
});
