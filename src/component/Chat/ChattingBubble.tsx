import { IChat } from '../../interfaces/Chatting-Format.dto';

export const ChattingBubble = ({
  props,
  nickName,
}: {
  props: IChat;
  nickName: string;
}) => {
  const sender = props.nickName === nickName ? 'me' : 'you';

  return sender !== 'me' ? (
    <div className="flex">
      <div className="w-14 h-14 rounded-full border-2 flex mb-[2.5%]">
        <img src={require('../../public/soo.png')} />
      </div>

      <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-lg max-w-[50%] bg-[#D9D9D9] justify-center mx-[1.5%] relative">
        <span className="mt-1 mx-1 inline-block"> {props.text} </span>
      </div>
    </div>
  ) : (
    <div className="flex">
      <div className="text-xl mb-[2.5%] px-5 py-2 rounded-[50px] shadow-lg max-w-[50%] bg-[#9D9D9D] justify-center mx-[1.5%] ml-auto relative">
        <span className="mt-1 mx-1 inline-block"> {props.text} </span>
      </div>
      <div className="w-14 h-14 rounded-full border-2 flex mb-[2.5%]">
        <img src={require('../../public/soo.png')} />
      </div>
    </div>
  );
};
