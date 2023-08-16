import { atom } from 'recoil';

export const newMatching = atom({
  key: 'newMatching',
  default: false,
});

export const ballXState = atom({
  key: 'ballX',
  default: 700, // Initial ball X position
});

export const ballYState = atom({
  key: 'ballY',
  default: 400, // Initial ball Y position
});

export const ballSpeedXState = atom({
  key: 'ballSpeedX',
  default: 8, // Initial ball speed in the X direction
});

export const ballSpeedYState = atom({
  key: 'ballSpeedY',
  default: 8, // Initial ball speed in the Y direction
});

export const player1ScoreState = atom({
  key: 'player1Score',
  default: 0,
});

export const player2ScoreState = atom({
  key: 'player2Score',
  default: 0,
});

export const player1PaddleState = atom({
  key: 'player1Paddle',
  default: 295,
});

export const player2PaddleState = atom({
  key: 'player2Paddle',
  default: 295,
});

export const startState = atom({
  key: 'startState',
  default: false,
});

export const endState = atom({
  key: 'end',
  default: false,
});

export const playerNumberState = atom({
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
  default: 700,
});

export const displayYState = atom({
  key: 'displayY',
  default: 400,
});

export const readyState = atom({
  key: 'ready',
  default: false,
});

export const roomIdState = atom({
  key: 'roomId',
  default: 0,
});

export const resetState = atom({
  key: 'reset',
  default: false,
});

export const joinState = atom({
  key: 'join',
  default: false,
});
