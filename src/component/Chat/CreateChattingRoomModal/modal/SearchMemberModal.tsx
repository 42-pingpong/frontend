import React, { memo } from 'react';
import { UserDto } from '../../../../interfaces/User.dto';
import { ChatSearchUser } from './ChatSearchUser';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  createChatRoomState,
  chatMemberListState,
} from '../../../../atom/chat';
import { isUserDuplicated } from '../../../../utils/createChatUtils';

interface Props {
  userList: UserDto[];
  topPositon: number;
  modalName: string;
}
export const SearchMemberModal = memo((props: Props) => {
  const { userList, topPositon, modalName } = props;
  const [formVlaue, setFormValue] = useRecoilState(createChatRoomState);
  const setMembers = useSetRecoilState(chatMemberListState);

  const handleAddMember = (user: UserDto) => {
    setFormValue((prev: any) => ({
      ...prev,
      participants: [...prev.participants, user.id],
    }));
    setMembers((prev: any) => [...prev, user]);
  };

  const handleDelMember = (user: UserDto) => {
    setFormValue((prev: any) => ({
      ...prev,
      participants: prev.participants.filter((item: any) => item !== user.id),
    }));
    setMembers((prev: any) => prev.filter((item: any) => item.id !== user.id));
  };

  return (
    <div
      className={`flex absolute flex-col top-[${topPositon}vh] left-[68vw]
       w-[17vw] h-[30vh] shadow-xl px-12 pb-10 pt-5 bg-[#F8F8F8] 
      rounded-[30px] mx-auto items-center justify-center z-10`}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="flex justify-center w-full items-center font-bold text-3xl text-borderBlue">
        {modalName}
      </span>
      <div className="overflow-y-auto w-full h-full inset-0 px-4">
        {userList.map((item) => (
          <ChatSearchUser
            key={item.id}
            user={item}
            isInvited={isUserDuplicated(formVlaue, item)}
            handleOnClick={
              isUserDuplicated(formVlaue, item)
                ? handleDelMember
                : handleAddMember
            }
            image={isUserDuplicated(formVlaue, item) ? 'minus' : 'plus'}
          />
        ))}
      </div>
    </div>
  );
});
