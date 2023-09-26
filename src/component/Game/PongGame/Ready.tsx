import { useRecoilValue } from 'recoil';
import { readyState } from '../../../atom/game';
import { GameSocket } from '../../../sockets/GameSocket';

export const Ready = () => {
  const ready = useRecoilValue(readyState);

  return (
    <div className="justify-center flex mt-[200px]">
      {ready === false ? (
        <span
          className="text-gray-500 text-bold text-[200px]"
          onClick={() => GameSocket.emit('ready')}
        >
          Ready
        </span>
      ) : (
        <span
          className="text-[#97D2DD] text-bold text-[200px]"
          onClick={() => GameSocket.emit('ready')}
        >
          Ready
        </span>
      )}
    </div>
  );
};
