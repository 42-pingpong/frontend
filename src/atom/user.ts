import { atom } from 'recoil';
import { UserDto } from '../interfaces/User.dto';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const loginState = atom<boolean>({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
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
