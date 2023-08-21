import { useRecoilState, useRecoilValue } from 'recoil';
import { authenticationModalState } from '../../atom/modal';
import { useState } from 'react';
import { userInfo } from '../../atom/user';
import axiosInstance from '../../api/axios';

export const Authentication = () => {
  const [modal, setModal] = useRecoilState(authenticationModalState);
  const [input, setInput] = useState('');
  const [ok, setOk] = useState(false);
  const user = useRecoilState(userInfo);

  const closeModal = () => {
    setModal(false);
  };

  const handleOnChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSendMail = () => {
    // user email 가져와서 보내기
    axiosInstance.post('/mail/send', {});
    setOk(true);
  };

  const handleAuthenticationSubmit = (input: string) => {
    console.log(input);
    // back db에서 꺼내와서 비교하면 될듯여
    // 그러면 ,,, 유저인포에 인증받았는지도 추가해야할듯??

    /**
     * 1. input과 db에 저장된 인증코드를 비교한다.
     * 2. 일치하면 유저인포에 인증받았다고 추가한다.
     * 3. 일치하지 않으면 다시 입력하라는 메시지를 띄운다.
     * 4. 인증받은 유저만 게임방에 입장할 수 있게 한다.
     */
  };

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
          <span className="text-2xl flow items-center grid justify-center mx-10 break-keep relative flex">
            서비스 이용을 위해 메일로 2차 인증을 진행하시겠습니까?
            <div className="flex mt-10">
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
          <span className="text-2xl flow items-center grid justify-center mx-10 break-keep relative flex">
            메일로 전송된 2차 인증 코드를 입력해주세요.
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
