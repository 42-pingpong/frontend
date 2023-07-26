import { modalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  return (
    <>
      <img
        src={require('../../public/soo.png')}
        alt="Profile"
        className="w-14 rounded-full border-emerald-400 border-2"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default Profile;
