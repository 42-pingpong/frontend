import { atom } from 'recoil';

export const profileModalState = atom<boolean>({
  key: 'profileModalState',
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
