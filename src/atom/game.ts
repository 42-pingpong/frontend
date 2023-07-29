import { atom } from 'recoil';

export const newMatching = atom({
  key: 'newMatching',
  default: false,
});

export const ballX = atom({
  key: 'ballX',
  default: 400, // Initial ball X position
});

export const ballY = atom({
  key: 'ballY',
  default: 200, // Initial ball Y position
});

export const ballSpeedX = atom({
  key: 'ballSpeedX',
  default: 4, // Initial ball speed in the X direction
});

export const ballSpeedY = atom({
  key: 'ballSpeedY',
  default: 4, // Initial ball speed in the Y direction
});

export const myScore = atom({
  key: 'myScore',
  default: 0,
});

export const otherScore = atom({
  key: 'otherScore',
  default: 0,
});

export const myPaddle = atom({
  key: 'myPaddle',
  default: 295,
});

export const otherPaddle = atom({
  key: 'otherPaddle',
  default: 295,
});

export const start = atom({
  key: 'start',
  default: false,
});

export const end = atom({
  key: 'end',
  default: false,
});
