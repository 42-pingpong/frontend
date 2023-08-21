import { atom } from 'recoil';

export const profileEditState = atom({
  key: 'profileEditState',
  default: false,
});

export const isAthenticatedState = atom({
  key: 'isAthenticatedState',
  default: false,
});
