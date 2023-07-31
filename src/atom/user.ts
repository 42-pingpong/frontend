import { atom } from 'recoil';

interface UserInfo {
  id: number;
  nickName: string;
  email: string;
  fullName: string;
  profile: string;
  selfIntroduction: string;
  level: number;
}

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
