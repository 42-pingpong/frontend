import { useEffect } from 'react';
import { ChatSection } from '../Chat/ChatSection';
import { DirectMessage } from '../Chat/DirectMessage/DirectMessage';
import { GameSection } from './GameSection';
import { GameSocket } from '../../sockets/GameSocket';
import { useRecoilValue } from 'recoil';
import { playerNumberState } from '../../atom/game';

export const Game = () => {
  return (
    <div className="h-screen bg-slate-100 py-5 ">
      <div className="pt-[2%] px-[10%] game:px-[8%] grid grid-cols-3 grid-rows-6 gap-20 h-[80vh]">
        <div
          id="game-section"
          className="col-span-3 game:col-span-2 row-span-6 h-[80vh] w-[1400px]"
        >
          <GameSection />
        </div>
        <div className="game:col-span-1">
          <div
            id="chat-section"
            className="col-span-1 row-span-6 h-[80vh] game:block hidden"
          >
            <DirectMessage />
          </div>
        </div>
      </div>
    </div>
  );
};
