import { profileModalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';
import { loginState } from '../../atom/user';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

export const Profile = () => {
  const URI = `${process.env.REACT_APP_SERVER}`;
  const [isModalOpen, setIsModalOpen] = useRecoilState(profileModalState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

	const handleLogin = () => {
		window.location.href = `${URI}/api/auth/42/login`;
	}

	const {data, isError, isSuccess} = useQuery('user', () => axios.get(`${URI}/api/user/me`, {
		withCredentials: true,
	}));
		
	if (isSuccess) {
		setIsLogin(true);
	}
	if (isError) {
		setIsLogin(false);
	}
	

  return (
    <>
      <img
        src={require('../../public/soo.png')}
        alt="Profile"
        className="w-14 rounded-full border-emerald-400 border-2"
        onClick={() => (isLogin ? setIsModalOpen(!isModalOpen) : handleLogin())}
      />
    </>
  );
};

