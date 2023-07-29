const SERVER = process.env.REACT_APP_SERVER;

const Login = () => {
  const handleLogin = () => {
    const authURL = SERVER + `/api/auth/42/login`;
    window.location.href = authURL;
  };

  return (
    <button
      className="bg-emerald-400 text-white px-3 py-1.5 rounded-md"
      onClick={() => handleLogin()}
    >
      Login
    </button>
  );
};

export default Login;
