const Login = () => {
  const handleLogin = () => {
    const authURL = `http://localhost:10002/api/auth/42/login`;
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
