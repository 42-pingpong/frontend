import { atom } from 'recoil';
import { ResponseNotificationDto } from '../interfaces/Request-Friend.dto';
import { UserDto } from '../interfaces/User.dto';

export const notificationState = atom<ResponseNotificationDto[]>({
  key: 'notificationState',
  default: [],
});

export const notiResponseState = atom<UserDto[]>({
  key: 'notiResponseState',
  default: [],
});
