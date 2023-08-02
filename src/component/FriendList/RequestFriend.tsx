import React from 'react';

//이거 알람 상태서버에서 어캐주는지 확인하고 수정해야됨
export const RequestFriend = ({ props }: { props: any }) => {
  return (
    <div className="mt-3 flex w-hull h-10 p-3 bg-sky rounded-full justify-between items-center">
      <span className="text-gray-500 font-semibold text-lg ml-5">
        {props.nickname}
      </span>
      <div className="flex justify-between w-12 h-full mr-3">
        <div className="h-4 w-4 rounded-full bg-green-400" />
        <div className="h-4 w-4 rounded-full bg-red-400" />
      </div>
    </div>
  );
};
