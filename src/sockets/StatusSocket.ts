import { io } from 'socket.io-client';

const URL = `${process.env.REACT_APP_WS}/status`;

export const StatusSocket = io(URL, {
  transports: ['websocket'],
  autoConnect: false,
  auth: (cb) => {
    const token = 'Bearer' + localStorage.getItem('token');
    cb({ token });
  },
});
