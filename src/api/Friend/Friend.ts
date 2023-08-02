import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GetFriendResponseDto } from '../../interfaces/Get-Friend.dto';
import axiosInstance from '../axios';
import { friendList, loginState, userInfo } from '../../atom/user';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

export const fetchUsers = async (userId: number) => {
  const response = await axiosInstance.get<GetFriendResponseDto[]>(
    `/user/me/friends/${userId}?status=all&includeMe=false`
  );
  return response.data;
};
