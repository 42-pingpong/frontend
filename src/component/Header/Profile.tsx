import { modalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom/login';

const Profile = () => {
  const [userInfoObj, setUserInfoObj] = useRecoilState(userInfo);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  return (
    <>
      <img
        src={userInfoObj.profile}
        alt="Profile"
        className="w-14 rounded-full border-emerald-400 border-2"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default Profile;
