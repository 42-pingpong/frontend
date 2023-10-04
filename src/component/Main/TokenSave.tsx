import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../atom/user';
import { profileEditState } from '../../atom/profile';

export const TokenSave = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ac = searchParams.get('accessToken');
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setProfileEdit = useSetRecoilState(profileEditState);

  useEffect(() => {
    if (ac !== null) {
      localStorage.setItem('token', ac);
      setIsLoggedIn(true);
      setProfileEdit(true);
    }

    navigate('/profile', { replace: true });
  }, []);

  return null;
};
