import { ChatRoomInfoDTO } from '../../../interfaces/Chatting-Format.dto';
import { ChatList } from '../ChatList/ChatList';
import useChatRoomPwManage from '../../../hooks/chat/useChatRoomPwManage';
import { InputChangeModal } from './InputChangeModal';
import { ManageButton } from './ManageButton';
import { changeType } from './InputChangeModal';

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

    setTitle,
    changeRoomTitle,
    changeRoomTitleModal,
    setChangeRoomTitleModal,
  } = useChatRoomPwManage();

  return (
    <section className="flex w-full justify-center items-center">
      <div className="flex w-[40%] min-w-min-[500vw] h-full">
        <ChatList props={props.roomInfo} />
      </div>
      <div className="flex absolute left-[65vw]">
        {props.role === 'owner' &&
          props.roomInfo.levelOfPublicity !== 'Priv' && (
            <>
              <ManageButton
                onClickFunc={() => setChangeRoomTitleModal(true)}
                text={'방 이름 변경'}
              />
              <ManageButton
                onClickFunc={() => setPassWordModal(true)}
                text={
                  props.roomInfo.levelOfPublicity === 'Pub'
                    ? '비밀번호 추가'
                    : '비밀번호 변경'
                }
              />
            </>
          )}
        {props.role === 'owner' &&
          props.roomInfo.levelOfPublicity === 'Prot' && (
            <ManageButton
              onClickFunc={() => deletePassword()}
              text="비밀번호 삭제"
            />
          )}
      </div>
      {passWordModal && (
        <InputChangeModal
          setModalOpen={setPassWordModal}
          setInput={setPassWord}
          changeInput={changePassword}
          changeType={
            props.roomInfo.levelOfPublicity === 'Pub'
              ? changeType.PW_ADD
              : changeType.PW_CHANGE
          }
        />
      )}
      {changeRoomTitleModal && (
        <InputChangeModal
          setModalOpen={setChangeRoomTitleModal}
          setInput={setTitle}
          changeInput={changeRoomTitle}
          changeType={changeType.TITLE_CHANGE}
        />
      )}
    </section>
  );
};
