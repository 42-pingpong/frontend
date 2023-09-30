import { useRecoilValue } from 'recoil';
import {
  isLeftState,
  player1NameState,
  player1ScoreState,
  player2NameState,
  player2ScoreState,
} from '../../../atom/game';
import { userInfo } from '../../../atom/user';

export const End = () => {
  const player1Score = useRecoilValue(player1ScoreState);
  const player2Score = useRecoilValue(player2ScoreState);
  const player1Name = useRecoilValue(player1NameState);
  const player2Name = useRecoilValue(player2NameState);
  const user = useRecoilValue(userInfo);
  const isLeft = useRecoilValue(isLeftState);
  const winner = player2Score > player1Score ? player2Name : player1Name;

  return (
    <div className="justify-center flex mt-[300px]">
      <span className="text-gray-500 text-bold text-[100px]">
        {isLeft === true ? user.nickName : winner} win !!
      </span>
    </div>
  );
};
