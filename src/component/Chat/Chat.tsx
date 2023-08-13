import React, { useEffect } from 'react';
import { ChatSection } from './ChatSection';
import { UserSection } from './UserSection';

export const Chat = () => {
  return (
    <div className="h-screen bg-slate-100 p-20 justify-center flex">
      <div className="pt-[2%] grid grid-cols-3 grid-rows-6 gap-20 w-full h-[80vh] max-w-[1800px]">
        <div className="col-span-2 row-span-6">
          <ChatSection />
        </div>
        <div className="col-span-1 row-span-6">
          <UserSection />
        </div>
      </div>
    </div>
  );
};
