import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const CURL = `ws://localhost:10002/chat`;

export const ChatSocket = io(CURL, {
  transports: ['websocket'],
  autoConnect: false,
  auth: (cb) => {
    // const token = `Bearer ${localStorage.getItem('token')}`;
    const token = 'Bearer' + localStorage.getItem('token');
    cb({ token });
  },
});
