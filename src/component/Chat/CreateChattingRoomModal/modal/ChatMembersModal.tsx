import React from 'react';
import { UserDto } from '../../../../interfaces/User.dto';
import { useSetRecoilState } from 'recoil';
import {
  createChatRoomState,
  chatMemberListState,
} from '../../../../atom/chat';

export const ChatMembersModal = ({ props }: { props: UserDto }) => {
  const setFormValue = useSetRecoilState(createChatRoomState);
  const setMembers = useSetRecoilState(chatMemberListState);
  console.log(props);
  const handleDelMember = () => {
    setFormValue((prev: any) => ({
      ...prev,
      participants: prev.participants.filter((item: any) => item !== props.id),
    }));

    setMembers((prev: any) => prev.filter((item: any) => item.id !== props.id));
  };

  return (
    //     <div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
    //       <div className="w-14 h-14 rounded-full border-2">
    //         <img src={props.profile} />
    //       </div>
    //       <div className="flex w-1/2">
    //         <span className="text-gray-500 text-xl">{props.nickName}</span>
    //       </div>
    //       <div
    //         className={`${
    //           props.status === 'online'
    //             ? 'bg-green-400'
    //             : props.status === 'offline'
    //             ? 'bg-red-400'
    //             : 'bg-blue-400 '
    //         } w-5 h-5 mr-3 rounded-full `}
    //       />
    //       <div className="flex w-10 h-6">
    //         <img
    //           src={require('../../../../public/minus.png')}
    //           className="opacity-50"
    //           onClick={handleDelMember}
    //         />
    //       </div>
    //     </div>
    null
  );
};
