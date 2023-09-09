import React from 'react';
import { useFetchBlockList } from '../../../hooks/user/useFetchBlockList';
import { BlockUser } from './BlockUser';

export const BlockList = () => {
  const blockList = useFetchBlockList();

  return (
    <div className="flex">
      {blockList.map((item) => (
        <BlockUser props={item} />
      ))}
    </div>
  );
};
