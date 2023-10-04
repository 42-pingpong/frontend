import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';

export const Fa = () => {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [inputCode, setInputCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('tmp');

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
    if (parseInt(e.target.value).toString() !== 'NaN') {
      setInputCode(e.target.value);
    } else {
      setErrorMessage('숫자만 입력해주세요.');
    }
  };

  const handleInputSubmit = async () => {
    console.log(token);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/auth/login/${inputCode}/2fa`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(res);
      navigate(`/token?accessToken=${res.data.accessToken}`);
    } catch (error: any) {
      console.log(error);
      // setErrorMessage(error);
    }
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
          value={inputCode}
          onChange={handleInputChange}
          className="border rounded w-full py-2 px-3"
        />
        <button
          className="flex w-full h-full justify-center items-center bg-progressBlue rounded-full shadow-xl"
          onClick={handleInputSubmit}
        >
          인증하기
        </button>
      </div>
      <div className="text-left mt-4 text-red-600 ">{errorMessage}</div>
    </div>
  );
};
