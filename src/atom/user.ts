import { atom } from 'recoil';

export const loginState = atom<boolean>({
  key: 'loginState',
  default: false,
});

export const addUserState = atom<boolean>({
  key: 'addUserState',
  default: false,
});
