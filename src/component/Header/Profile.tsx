import { useCallback, useState } from 'react';
import { ProfileModal } from './ProfileModal';
import { modalState } from '../../atom/modal';
import { useRecoilState } from 'recoil';

export const Profile = () => {
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
