import React, { useState, useEffect } from 'react';

export const Fa = () => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
      } else {
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold mb-2">
          남은 시간: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="이메일 인증번호를 입력해주세요."
          value={inputValue}
          onChange={handleInputChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
    </div>
  );
};
