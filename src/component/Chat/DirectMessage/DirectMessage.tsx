import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ServiceTitle } from '../../Main/ServiceTitle';
import useDirectMessage from '../../../hooks/chat/useDirectMessage';
import { useRecoilValue } from 'recoil';
import { enemyIdState } from '../../../atom/game';
import { ChattingBubble } from '../ChattingBubble';

export const DirectMessage = () => {
  const param = useParams().id;
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);
  const enemyId = useRecoilValue(enemyIdState);
  const id = enemyId !== 0 ? enemyId : param ? parseInt(param, 10) : 0;

  const { input, setInput, dm, handleSendDm } = useDirectMessage(id);

  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
    }
  }, [dm]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div
        id="dm-section"
        className="flex flex-col h-full w-[1800px] max-w-[1800px] py-20 px-40 mt-[3rem]"
      >
        <div className="flex">
          <ServiceTitle title="Direct Message" nonAddButton={true} />
        </div>
        <div className="flex relative h-full flex-col rounded-3xl shadow-2xl flex-grow pt-14 items-center bg-slate-50">
          <div className="flex w-full mt-[2%] h-[80%] md:h-[800px] justify-between items-center px-14 z-10 overflow-y-auto">
            <div
              className="flex flex-col w-full h-full px-2 overflow-y-auto"
              ref={scrollBottomRef}
            >
              {dm.map((item, idx) => (
                <ChattingBubble key={idx} {...item.messageInfo} />
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between w-full px-16 items-center mt-5 h-[6rem]">
            <input
              type="text"
              className="text-xl px-5 bottom-10 rounded-[50px] shadow-md w-[90%] h-[3rem] bg-[#D9D9D9] justify-center outline-none"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendDm();
              }}
              value={input}
              autoFocus
            ></input>
            <div
              className="right-5 bottom-10 shadow-md h-[3rem] w-[6%] bg-[#D9D9D9] rounded-3xl"
              onClick={handleSendDm}
            >
              <img
                src={require('../../../public/whitePlane.png')}
                className=" mx-auto mt-2.5 w-7 h-7"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
