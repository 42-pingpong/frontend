import { useRecoilValue, useSetRecoilState } from 'recoil';
import { GetFriendResponseDto } from '../../interfaces/Get-Friend.dto';
import axiosInstance from '../axios';
import { friendList, userInfo } from '../../atom/user';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

const fetchUsers = async () => {
  const response = await axiosInstance.get<GetFriendResponseDto[]>(
    '/user/me/friends/${userInfoState.id}?status=all&includeMe=false'
  );
  return response.data;
};

export const useFetchFriendList = () => {
  const setUserList = useSetRecoilState(friendList);
  const isLogin = useRecoilValue(userInfo);

  console.log('call useFetchFriendList tqlkf');
  const { data, isSuccess, isError } = useQuery<GetFriendResponseDto[]>(
    'users',
    fetchUsers
  );

  useEffect(() => {
    if (isSuccess && data && isLogin) {
      setUserList(data);
      console.log('call useFetchFriendList');
    }
  });

  // if (isLogin) {
  //   console.log('call useFetchFriendList000000000000000');

  //   if (isError) {
  //     console.log('error');
  //   }
  //   if (isSuccess && data) {
  //     setUserList(data);
  //     console.log('call useFetchFriendList');
  //   }
  // }
};
