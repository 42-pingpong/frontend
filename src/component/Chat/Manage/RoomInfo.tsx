import { ChatRoomInfoDTO } from '../../../interfaces/Chatting-Format.dto';
import { ChatList } from '../ChatList/ChatList';
import useChatRoomPwManage from '../../../hooks/chat/useChatRoomPwManage';
import { PassWordChangeModal } from './PassWordChangeModal';
import { PassWordButton } from './PassWordButton';

interface props {
  role: string;
  roomInfo: ChatRoomInfoDTO;
}

export const RoomInfo = (props: props) => {
  const {
    changePassword,
    deletePassword,
    setPassWord,
    passWordModal,
    setPassWordModal,
  } = useChatRoomPwManage();

  return (
    <section className="flex w-full justify-center items-center">
      <div className="flex w-[40%] min-w-min-[500vw] h-full">
        <ChatList props={props.roomInfo} />
      </div>
      <div className="flex absolute left-[70vw] w-[220px] justify-between">
        {props.role === 'owner' &&
          props.roomInfo.levelOfPublicity !== 'Priv' && (
            <PassWordButton
              onClickFunc={() => setPassWordModal(true)}
              text={
                props.roomInfo.levelOfPublicity === 'Pub'
                  ? '비밀번호 추가'
                  : '비밀번호 변경'
              }
            />
          )}
        {props.role === 'owner' &&
          props.roomInfo.levelOfPublicity === 'Prot' && (
            <PassWordButton
              onClickFunc={() => deletePassword()}
              text="비밀번호 삭제"
            />
          )}
      </div>
      {passWordModal && (
        <PassWordChangeModal
          setModalOpen={setPassWordModal}
          setPassWord={setPassWord}
          changePassword={changePassword}
          levelOfPublicity={props.roomInfo.levelOfPublicity}
        />
      )}
    </section>
  );
};
