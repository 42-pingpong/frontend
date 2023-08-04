import { io } from 'socket.io-client';

const CURL = `${process.env.REACT_APP_WS}/chat`;

export const ChatSocket = io(CURL, {
  transports: ['websocket'],
  autoConnect: false,
  auth: (cb) => {
    const token = 'Bearer ' + localStorage.getItem('token');
    cb({ token });
  },
});
