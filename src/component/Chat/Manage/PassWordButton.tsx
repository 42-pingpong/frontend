import React from 'react';

interface props {
  onClickFunc: () => void;
  text: string;
}

export const PassWordButton = (props: props) => {
  const { onClickFunc, text } = props;
  return (
    <button
      className="flex w-24 h-10 justify-center items-center p-1
                bg-progressBlue rounded-3xl shadow-md"
      onClick={onClickFunc}
    >
      <span className=" text-white text-sm">{text}</span>
    </button>
  );
};
