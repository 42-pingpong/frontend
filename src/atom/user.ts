import { atom } from 'recoil';
import { UserDto } from '../interfaces/User.dto';

export const loginState = atom<boolean>({
  key: 'loginState',
  default: false,
});

export const userInfo = atom<UserDto>({
  key: 'userInfo',
  default: {
    id: -1,
    nickName: '',
    email: '',
    fullName: '',
    profile: '',
    selfIntroduction: '',
    level: 0,
    status: '',
  },
});

export const friendListState = atom<UserDto[]>({
  key: 'friendListState',
  default: [],
});
