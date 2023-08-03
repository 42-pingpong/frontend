import { chatForm } from './ChatSection';

export const Chatting = ({ props }: { props: chatForm }) => {
  return props.sender !== 'me' ? (
    <div className="flex">
      <div className="w-14 h-14 rounded-full border-2 flex mb-[2.5%]">
        <img src={require('../../public/soo.png')} />
      </div>

      <div className="text-xl mb-[2.5%] px-5 rounded-[50px] shadow-lg max-w-[50%] bg-[#D9D9D9] justify-center mx-[2.5%] relative">
        <span className="inline-block align-middle "> {props.text} </span>
        {/*  mt-3 */}
      </div>
    </div>
  ) : (
    <div className="flex">
      <div className="text-xl mb-[2.5%] px-5 rounded-[50px] shadow-lg max-w-[50%] bg-[#9D9D9D] justify-center mx-[2.5%] ml-auto">
        <span> {props.text} </span>
      </div>
      <div className="w-14 h-14 rounded-full border-2 flex mb-[2.5%]">
        <img src={require('../../public/soo.png')} />
      </div>
    </div>
  );
};
