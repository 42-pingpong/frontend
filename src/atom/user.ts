import { atom } from 'recoil';
import { UserDto } from '../interfaces/User.dto';

//persist는 좀 더 고민해봐야겠다......
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
    is2FAEnabled: false,
    is2FAVerified: false,
    TFAVerifyDueDate: undefined,
  },
});

export const friendListState = atom<UserDto[]>({
  key: 'friendListState',
  default: [],
});

export const authenticationState = atom({
  key: 'authenticationState',
  default: false,
});
