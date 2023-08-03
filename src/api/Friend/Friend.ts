import axiosInstance from '../axios';
import { UserDto } from '../../interfaces/User.dto';

export const fetchFriendList = async (userId: number) => {
  const response = await axiosInstance.get<UserDto[]>(
    `/user/me/friends/${userId}?status=all`
  );
  return response.data;
};
