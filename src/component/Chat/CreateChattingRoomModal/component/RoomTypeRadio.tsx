import React from 'react';

interface Props {
  handleRoomtype: (e: any) => void;
}

export const RoomTypeRadio = (props: Props) => {
  const roomtypeList = ['Public', 'Protected', 'Private'];
  const { handleRoomtype } = props;

  return (
    <div className="pb-[6%] px-[8%] flex justify-center space-x-[5vw] text-[#5D777B] text-2xl font-light tracking-tight">
      {roomtypeList.map((item, idx) => (
        <label key={idx}>
          <div className="checkbox flex justify-center items-center">
            <input
              name="levelOfPublicity"
              type="radio"
              id={item}
              className="flex checked:bg-sky"
              onClick={(e) => handleRoomtype(e)}
            />
            <span className="flex pl-2">{item}</span>
          </div>
        </label>
      ))}
    </div>
  );
};
