import { StatusSocket } from './StatusSocket';

const eventHandlers: any = {};

export const addSocketListener = (eventName: string, handler: any) => {
  eventHandlers[eventName] = handler;
};

export const removeSocketListener = (eventName: string) => {
  delete eventHandlers[eventName];
};

const handleIncomingEvent = (eventName: string, data: any) => {
  const handler = eventHandlers[eventName];
  if (handler) {
    handler(data);
  }
};

export const handleFriendRequest = (data: any) => {
  console.log('friend-request', data);
};

// Listen for incoming 'friend-request' events
StatusSocket.on('friend-request', (data) => {
  handleIncomingEvent('friend-request', data);
});

export default handleIncomingEvent;
