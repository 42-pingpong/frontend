import { UserDto } from './User.dto';

export interface GetFriendResponseDto {
  user: UserDto;

  userId: number;

  friend: UserDto;

  friendId: number;
}
