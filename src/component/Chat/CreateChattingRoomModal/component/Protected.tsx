import React from 'react';

interface Props {
  handleOnChange: (e: any) => void;
  handleRefChange: (e: any) => void;
  userSearch: () => Promise<void>;
  setMemberFocus: (value: boolean) => void;
}

export const Protected = (props: Props) => {
  const { handleOnChange, handleRefChange, setMemberFocus, userSearch } = props;
  return (
    <>
      <div className="px-[8%] text-[#5D777B] text-2xl relative ">
        <h1 className="pb-3 font-light tracking-tight">Max Participant</h1>
        <input
          name="maxParticipants"
          type="number"
          min={2}
          max={10}
          placeholder="You can invite up to 10 people"
          className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
          onChange={(e) => handleOnChange(e)}
        />
      </div>

      <div className="px-[8%] text-[#5D777B] text-2xl relative ">
        <h1 className="pb-3 font-light tracking-tight"> Member</h1>
        <input
          id="member"
          name="member"
          type="text"
          className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
          onChange={(e) => {
            handleRefChange(e);
          }}
          onFocus={() => {
            setMemberFocus(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              userSearch();
            }
          }}
        ></input>
      </div>
      <div className="px-[8%] text-[#5D777B] text-2xl">
        <h1 className="pb-3 font-light tracking-tight"> Password </h1>
        <input
          name="password"
          type="text"
          className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
          onChange={(e) => handleOnChange(e)}
        ></input>
      </div>
    </>
  );
};
