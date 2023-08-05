import { atom } from 'recoil';
import { ResponseNotificationDto } from '../interfaces/Request-Friend.dto';

export const notificationState = atom<ResponseNotificationDto[]>({
  key: 'notificationState',
  default: [],
});
