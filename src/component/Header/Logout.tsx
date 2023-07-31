import axios from 'axios';
import { loginState } from '../../atom/login';
import { profileModalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';

const SERVER = process.env.REACT_APP_SERVER;

const Logout = () => {
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [, setIsModalOpen] = useRecoilState(profileModalState);
  const handleLogout = async () => {
    const logoutURL = SERVER + `/api/auth/logout`;

    const res = await axios(logoutURL, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsModalOpen(false);
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
