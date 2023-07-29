import { io } from 'socket.io-client';
import cookieExtractor from '../tools/cookieExtractor';

// "undefined" means the URL will be computed from the `window.location` object
const URL = `ws://localhost:10002/status`;

export const StatusSocket = io(URL, {
  transports: ['websocket'],
  autoConnect: false,
  auth: (cb) => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    cb({ token });
  },
});
