import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authenticationModalState } from '../../atom/modal';
import { useEffect, useState } from 'react';
import { authenticationState, userInfo } from '../../atom/user';
import axiosInstance from '../../api/axios';

export interface SendMailDto {
  nickName: string;
  userId: number;
  mailAddress: string;
}

export const AuthenticationModal = () => {
  const [modal, setModal] = useRecoilState(authenticationModalState);
  const [input, setInput] = useState('');
  const [ok, setOk] = useState(false); // 인증 받겠다고 함
  const user = useRecoilState(userInfo);
  const [authentication, setAuthentication] =
    useRecoilState(authenticationState);
  const [retry, setRetry] = useState(false);
  const [validationCode, setValidationCode] = useState('');

  const closeModal = () => {
    setModal(false);
    setOk(false);
    setRetry(false);
  };

  const handleOnChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSendMail = async () => {
    // user email 가져와서 보내기
    if (!user[0].email) return;
    const data = {
      nickName: user[0].nickName,
      userId: user[0].id,
      mailAddress: user[0].email,
    };
    console.log(data);
    await axiosInstance
      .post('/mail/send', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setOk(true);
  };

  const handleAuthenticationSubmit = async (input: string) => {
    // back db에서 꺼내와서 비교하면 될듯여
    // 그러면 ,,, 유저인포에 인증받았는지도 추가해야할듯??
    const res = await axiosInstance.patch(`/mail/code/${input}`);
    if (res?.data?.isEmailVerified) setAuthentication(true);
  };

  useEffect(() => {
    if (validationCode === '') return;
    if (validationCode === input) {
      setAuthentication(true);
      setModal(false);
    } else {
      setRetry(true);
    }
  }, [validationCode]);

  return (
    <div
      aria-hidden={true}
      className="flex bg-[rgba(0,0,0,0.1)] items-center justify-center z-30 fixed top-0 left-0 w-full h-full"
    >
      <div
        id="authentication-content"
        className={`relative flex flex-col w-[30rem] h-[20rem] z-30 bg-[#F8F8F8] rounded-3xl shadow-lg items-center justify-center py-2`}
      >
        {!ok ? (
          <span className="text-2xl flow items-center grid justify-center mx-10 break-keep relative text-gray-500">
            서비스 이용을 위해 메일로 2차 인증을 진행하시겠습니까?
            <div className="flex mt-[15%]">
              <button
                className="w-[30%] text-white flex h-10 justify-center items-center bg-progressBlue mx-auto rounded-full shadow-xl"
                onClick={handleSendMail}
              >
                네
              </button>
              <button
                className="w-[30%] text-white flex h-10 justify-center items-center bg-progressBlue mx-auto rounded-full shadow-xl"
                onClick={closeModal}
              >
                아니오
              </button>
            </div>
          </span>
        ) : (
          <span className="text-2xl flow items-center grid justify-center mx-10 break-keep relative text-gray-500">
            메일로 전송된 2차 인증 코드를 입력해주세요.
            {!authentication && retry && (
              <span className="mt-2 text-lg break-kepp mx-auto text-red-400">
                입력값을 확인하세요.
              </span>
            )}
            <input
              type="text"
              className="mt-5 px-5 align-middle justify-center rounded-[50px] shadow-lg w-full h-[3rem] font-light"
              onChange={(e) => handleOnChange(e)}
            ></input>
            <div className="flex mt-8">
              <button
                className="w-[30%] text-white flex h-10 justify-center items-center bg-progressBlue mx-auto rounded-full shadow-xl"
                onClick={() => handleAuthenticationSubmit(input)}
              >
                인증
              </button>
              <button
                className="w-[30%] text-white flex h-10 justify-center items-center bg-progressBlue mx-auto rounded-full shadow-xl"
                onClick={closeModal}
              >
                취소
              </button>
            </div>
          </span>
        )}

        <button
          id="modal-close-button"
          className="absolute top-3 right-5 p-0 text-gray-400 text-lg"
          onClick={() => closeModal()}
        >
          X
        </button>
      </div>
    </div>
  );
};
