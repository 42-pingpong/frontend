import { CreateGroupchatDto } from '../interfaces/Groupchat-Create.dto';
import { UserDto } from '../interfaces/User.dto';

export const excludeMeFriendList = (data: any, id: number) =>
  data.filter((item: UserDto) => item.id !== id);

export const isUserDuplicated = (
  formValue: CreateGroupchatDto,
  user: UserDto
) => {
  if (formValue.participants === undefined) return false;
  return formValue.participants?.some((item) => item === user.id);
};
