import { ServiceTitle } from '../Main/ServiceTitle';
import { Matchpoint } from './Matchpoint';
import { PongGame } from './PongGame';

export const GameSection = () => {
  return (
    <div id="game-section" className="flex flex-col h-full">
      <div className="flex">
        {/* Game 해두면 게이지 그거 돌 것 같아서 일단 Pong으로 해뒀어염
                게임모드 어쩌구저쩌구 이걸로 해도 될 것 같습니다?? */}
        <ServiceTitle title="Pong" nonAddButton={true} />
      </div>
      <div className="rounded-3xl mx-auto justify-center w-[300px] z-10">
        <Matchpoint />
      </div>
      <div
        id="pong-section"
        className=" top-[30px] rounded-3xl shadow-xl h-[830px] relative flex justify-center"
      >
        <div className="w-full h-[830px] game:px-0 ">
          <PongGame />
        </div>
      </div>
    </div>
  );
};
