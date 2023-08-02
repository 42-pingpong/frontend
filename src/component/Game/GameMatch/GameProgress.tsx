import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { newMatching } from '../../../atom/game';
import { ProgressBar } from './ProgressBar';

export const GameProgress = () => {
  const matching = useRecoilValue(newMatching);
  const [progress, setProgress] = React.useState(0);
  let interval: any = undefined;

  useEffect(() => {
    if (matching) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 50);
    } else {
      setProgress(0);
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [matching]);

  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
      clearInterval(interval);
    }
  }, [progress]);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <div className="flex w-full h-1/4 justify-center">
        {matching ? (
          <span className=" text-gray-500 text-xl">matching . . .</span>
        ) : (
          <div />
        )}
      </div>
      <div className="flex flex-col w-full h-3/4 justify-center">
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};
