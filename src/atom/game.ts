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
  default: 8, // Initial ball speed in the X direction
});

export const ballSpeedY = atom({
  key: 'ballSpeedY',
  default: 8, // Initial ball speed in the Y direction
});

export const player2Score = atom({
  key: 'player2Score',
  default: 0,
});

export const player1Score = atom({
  key: 'player1Score',
  default: 0,
});

export const player2Paddle = atom({
  key: 'player2Paddle',
  default: 295,
});

export const player1Paddle = atom({
  key: 'player1Paddle',
  default: 295,
});

export const startState = atom({
  key: 'startState',
  default: false,
});

export const end = atom({
  key: 'end',
  default: false,
});

export const playerNumber = atom({
  key: 'playerNumber',
  default: 0,
});

export const player1NameState = atom({
  key: 'player1Name',
  default: '',
});

export const player2NameState = atom({
  key: 'player2Name',
  default: '',
});

export const displayXState = atom({
  key: 'displayX',
  default: 400,
});

export const displayYState = atom({
  key: 'displayY',
  default: 200,
});
