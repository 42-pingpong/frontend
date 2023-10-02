import axiosInstance from '../../api/axios';

const SERVER = process.env.REACT_APP_SERVER;

const Logout = () => {
  const handleLogout = async () => {
    const res = await axiosInstance('/auth/logout');
    localStorage.removeItem('token');
    //로그아웃시 홈으로 이동 ( 어차피 저희 서비스 무조건 로그인 해야 이용되니까..)
    window.location.href = '/';
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
