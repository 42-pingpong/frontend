import { senderDTO } from '../../../interfaces/Chatting-Format.dto';

export const BlockUser = ({
  props,
  onClick,
}: {
  props: senderDTO;
  onClick: any;
}) => {
  return (
    <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
      <div className="flex w-14 h-14 rounded-full border-2">
        <img src={props.profile} className="flex rounded-full" />
      </div>
      <div className="flex w-1/2">
        <span className="text-gray-500 text-xl">{props.nickName}</span>
      </div>
      <div className="flex w-20 h-6">
        <button
          onClick={onClick}
          className="h-full w-full bg-progressBlue text-white rounded-full shadow-md text-sm"
        >
          un-block
        </button>
      </div>
    </div>
  );
};
