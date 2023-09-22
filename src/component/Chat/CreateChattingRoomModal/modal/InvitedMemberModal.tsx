import { UserDto } from '../../../../interfaces/User.dto';
// import { ChatMembersModal } from './ChatMembersModal';
// import { ChatSearchUser } from './ChatSearchUser';

interface Props {
  chatMembers: UserDto[];
}

export const InvitedMembersModal = (props: Props) => {
  const { chatMembers } = props;

  return (
    // <div
    //   id="member-list"
    //   className="flex absolute flex-col top-[11vh] left-[68vw] w-[17vw] h-[30vh] shadow-xl px-12 pb-10 pt-5 bg-[#F8F8F8] rounded-[30px] mx-auto items-center justify-center z-10"
    //   onClick={(e) => e.stopPropagation()}
    // >
    //   <span className="flex justify-center w-full items-center font-bold text-3xl text-borderBlue">
    //     invited members
    //   </span>
    //   <div className="overflow-y-auto w-full h-full inset-0 px-4">
    //     {chatMembers.map((item) => (
    //       // <ChatMembersModal key={item.id} props={item} />
    //       // <ChatSearchUser key={item.id} user={item} />
    //     ))}
    //   </div>
    // </div>
    null
  );
};
