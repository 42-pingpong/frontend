import { loginState } from '../../atom/login';
import { useRecoilState } from 'recoil';

const Logout = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  const handleLogout = async () => {
    const logoutURL = `http://localhost:10002/api/auth/logout`;

    const res = await fetch(logoutURL, {
      credentials: 'include',
    });
    setIsLoggedIn(false);
  };

  return (
    <div>
      <button onClick={() => handleLogout()} className="logout">
        로그아웃
      </button>
    </div>
  );
};

export default Logout;
