import { ChatSection } from '../Chat/ChatSection';
import { GameSection } from './GameSection';

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
          {/* 창 작아지면 채팅창 걍 사라지게 해뒀어염 */}
          <div
            id="chat-section"
            className="col-span-1 row-span-6 h-[80vh] game:block hidden"
          >
            <ChatSection />
          </div>
        </div>
      </div>
    </div>
  );
};
