import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../atom/user';

export const TokenSave = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ac = searchParams.get('accessToken');
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    if (ac !== null) {
      localStorage.setItem('token', ac);
      setIsLoggedIn(true);
    }

    navigate('/profile', { replace: true });
  }, []);

  return null;
};
