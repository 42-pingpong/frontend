import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Main } from './Main';

export const TokenSave = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ac = searchParams.get('accessToken');

  useEffect(() => {
    if (ac !== null) {
      console.log(ac);
      localStorage.setItem('token', ac);
    }

    // Use `replace` instead of `navigate` to avoid query string in the URL
    navigate('/', { replace: true });
  }, [ac, navigate]);

  // Render nothing since we've already navigated to /main
  return null;
};
