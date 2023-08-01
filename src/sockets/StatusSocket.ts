import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = `${process.env.REACT_APP_WS}/status`;

export const StatusSocket = io(URL, {
  transports: ['websocket'],
  autoConnect: false,
  auth: (cb) => {
    const token = 'Bearer' + localStorage.getItem('token');
    cb({ token });
  },
});
