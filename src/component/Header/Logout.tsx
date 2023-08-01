import { loginState } from '../../atom/user';
import { profileModalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';
import axiosInstance from '../../api/axios';

const SERVER = process.env.REACT_APP_SERVER;

const Logout = () => {
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [, setIsModalOpen] = useRecoilState(profileModalState);
  const handleLogout = async () => {
    const res = await axiosInstance('/auth/logout');
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
