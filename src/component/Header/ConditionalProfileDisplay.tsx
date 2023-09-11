import Login from './Login';
import Profile from './Profile';
import useFetchUserMe from '../../hooks/user/useFetchUserMe';

const ConditionalProfileDisplay = () => {
  const isLoggedIn = useFetchUserMe();
  return (
    <div className="flex items-center mr-3">
      {isLoggedIn ? <Profile /> : <Login />}
    </div>
  );
};

export default ConditionalProfileDisplay;
