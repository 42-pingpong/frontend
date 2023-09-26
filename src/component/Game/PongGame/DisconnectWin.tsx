import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../atom/user';

export const DisconnectWin = () => {
  const user = useRecoilValue(userInfo);

  return (
    <div className="justify-center flex mt-[300px]">
      <span className="text-gray-500 text-bold text-5xl px-auto">
        상대방의 연결이 끊겼습니다.
        <br />
        {user.nickName} 님이 승리했습니다!
      </span>
    </div>
  );
};
