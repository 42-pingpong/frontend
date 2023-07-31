import React from 'react';

interface statusProps {
  status: string;
  color: string;
}

export const StatusIcon = ({ props }: { props: statusProps }) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className={`w-5 h-5 rounded-full ${props.color}`} />
      <span className="ml-2 mb-1 text-[1.2rem] text-gray-500">
        {props.status}
      </span>
    </div>
  );
};
