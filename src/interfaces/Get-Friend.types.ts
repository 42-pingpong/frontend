import { User } from './User.types';

export interface GetFriendResponseDto {
  user: User;

  userId: number;

  friend: User;

  friendId: number;
}
