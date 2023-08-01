import axiosInstance from '../../api/axios';

const SERVER = process.env.REACT_APP_SERVER;

const Logout = () => {
  const handleLogout = async () => {
    const res = await axiosInstance('/auth/logout');
    localStorage.removeItem('token');
    //로그아웃시 새로고침으로 모든 페이지 상태 초기화
    window.location.reload();
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
