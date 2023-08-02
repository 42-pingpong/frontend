import { useRecoilState } from 'recoil';
import { friendProfileModalState } from '../../atom/modal';
import { UserDto } from '../../interfaces/User.dto';
import { useNavigate } from 'react-router-dom';

// myProfile 로직 거의 쓴 거 맞는데 div 위치 조정하는 것 때문에 컴포넌트 부른게 아니라 코드 긁었어염 ...
// 요부분 나중에 수정하는 걸로 생각하고 일단 이렇게 넣어뒀고 그 때 prop으로 boolean 던져서 나인지 아닌지 보면 될 것 같아여 (저의 생각 ,,,)
// myProfile 부분과 다른 부분
// navigateToProfile 이 prop 받음
// 좌표 받아서 div 띄움

interface FriendProfileModalProps {
  user: UserDto;
  x: number;
  y: number;
}

export const FriendProfileModal: React.FC<FriendProfileModalProps> = ({
  user,
  x,
  y,
}) => {
  const navigation = useNavigate();
  const [friendProfile, setFriendProfile] = useRecoilState(
    friendProfileModalState
  );

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('frined-profile-content');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (
      modalContent &&
      modalContent.contains(e.target) &&
      e.target !== modalCloseButton
    )
      e.stopPropagation();
    else setFriendProfile(!friendProfile);
  };

  const navigateToProfile = (nickName: string) => {
    // 네비게이터가 라우팅 해주는 것 같아서 일단 이렇게 넣어뒀어여
    navigation(`profile/:${nickName}`);
    setFriendProfile(!friendProfile);
  };

  // y좌표 너무 낮으면 올라오게 설정
  if (y > 900) y -= 300;

  return (
    <div className="background bg-[rgba(0,0,0,0.1)]" onClick={closeModal}>
      <div
        id="frined-profile-content"
        className={`relative flex flex-col float-right bg-white rounded-3xl w-[28rem] h-[24rem] items-center justify-center shadow-lg shadow-gray-300 z-10 right-[35%]`}
        style={{ top: y - 50 }}
      >
        <div className="profile-container">
          <div className="profile-image-container">
            <img
              src={user.profile}
              alt="Profile"
              className="absolute w-[7.5rem] h-[7.5rem] rounded-full border-4 m-3 border-borderBlue object-cover"
            />
          </div>
          <div className="profile-content-container">
            <div className="profile-name-container">
              <span className="profile-name">{user.nickName}</span>
            </div>
            <div className="profile-email-container">
              <span className="profile-email">{user.email}</span>
            </div>
            <div className="profile-massege-container">
              <p className="profile-massege">{user.selfIntroduction}</p>
            </div>
          </div>
        </div>
        <div
          className="profile-button-container"
          onClick={() => navigateToProfile(user.nickName)}
        >
          <span className="profile-button-text"> Profile </span>
        </div>
        <button
          id="modal-close-button"
          className="absolute top-3 right-7 p-0 text-gray-400 text-lg"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </div>
  );
};
