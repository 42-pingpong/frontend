import { io } from 'socket.io-client';

const GURL = `${process.env.REACT_APP_WS}/game`;

export const GameSocket = io(GURL, {
  transports: ['websocket'],
  autoConnect: false,
  auth: (cb) => {
    const token = 'Bearer' + localStorage.getItem('token');
    cb({ token });
  },
});
