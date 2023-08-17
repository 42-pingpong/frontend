import React from 'react';

export const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <img
        src={require('../public/loading.gif')}
        className="w-[10%] aspect-square"
        alt="loading"
      />
    </div>
  );
};
