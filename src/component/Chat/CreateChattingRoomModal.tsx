import React, { useEffect, useRef, useState } from 'react';
import { chattingModalState } from '../../atom/modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CreateGroupchatDto } from '../../interfaces/Groupchat-Create.dto';
import { ChatSocket } from '../../sockets/ChatSocket';
import { friendListState, userInfo } from '../../atom/user';
import axiosInstance from '../../api/axios';
import { UserDto } from '../../interfaces/User.dto';
import { SearchUserList } from '../FriendList/SearchUser';

const roomtypeList = ['Public', 'Protected', 'Private'];

export const CreateChattingRoomModal = () => {
  const [chattingState, setChattingState] = useRecoilState(chattingModalState);
  const user = useRecoilValue(userInfo);
  const [userList, setUserList] = useState<UserDto[]>([]);
  const memberRef = useRef('');
  const friendList = useRecoilValue(friendListState);
  const focusRef = useRef<any>(null);
  const [memberFocus, setMemberFocus] = useState(false);

  const [formValue, setFormValue] = useState<CreateGroupchatDto>({
    chatName: '',
    password: '',
    levelOfPublicity: 'Public',
    maxParticipants: 0,
    ownerId: user.id,
    // DTO에 없는데 필요할 것 같아서 일단 적어둠
    // memebers: [],
  });

  // 멤버 인풋창 포커스 벗어나면 닫히게
  function handleFocus(e: any) {
    if (focusRef.current && !focusRef.current.contains(e.target)) {
      setMemberFocus(false);
    }
  }

  useEffect(() => {
    // 이벤트 리스너에 handleFocus 함수 등록
    document.addEventListener('mousedown', handleFocus);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      document.removeEventListener('mousedown', handleFocus);
    };
  }, [focusRef]);

  const closeModal = (e: any) => {
    const modalContent = document.getElementById('chattingroom-content');
    const modalCloseButton = document.getElementById('modal-close-button');

    if (
      modalContent &&
      modalContent.contains(e.target) &&
      e.target !== modalCloseButton
    )
      e.stopPropagation();
    else setChattingState(!chattingState);
  };

  const isUserDuplicated = (user: UserDto) => {
    return friendList.some((item) => item.id === user.id);
  };

  const handleRoomtype = (e: any) => {
    setFormValue((prev) => ({ ...prev, levelOfPublicity: e.target.id }));
  };

  const handleOnChange = (e: any) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const userSearch = async () => {
    console.log(memberRef.current);
    if (memberRef.current === '') return;
    const res = await axiosInstance.get(
      `/user/search?nickName=${memberRef.current}`
    );

    if (res.data !== undefined) {
      const searchList = excludeMeFriendList(res.data);
      if (searchList.length === 0) return;
      setUserList(searchList);
    }
  };

  const handleRefChange = (e: any) => {
    memberRef.current = e.target.value;
  };

  const excludeMeFriendList = (data: any) =>
    data.filter((item: UserDto) => item.id !== user.id);

  return (
    <div className="background bg-[rgba(0,0,0,0.2)]" onClick={closeModal}>
      <div
        id="chattingroom-content"
        className="min-w-[500px] w-[35vw] h-[65vh] shadow-xl bg-[#F8F8F8] rounded-[30px] mx-auto align-middle justify-center relative z-10 mt-[10vh] grid grid-cols-1 grid-rows-4"
      >
        <div className="grid-rows-1">
          <p className="py-[7%] px-[8%]  font-sans font-[320]  text-[35px] leading-[41px] tracking-tighter text-[#5D777B]">
            Create Chatting Room
          </p>
          <div className="pb-[6%] px-[8%] flex justify-center space-x-[5vw] text-[#5D777B] text-2xl font-light tracking-tight">
            {roomtypeList.map((item, idx) => (
              <label key={idx}>
                <div className="checkbox inline-block">
                  <input
                    name="levelOfPublicity"
                    type="radio"
                    id={item}
                    className=" checked:bg-sky "
                    onClick={(e) => handleRoomtype(e)}
                  ></input>{' '}
                  {item}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="relative row-span-3 grid gap-10">
          <div className="px-[8%] text-[#5D777B] text-2xl ">
            <h1 className="pb-3 font-light tracking-tight"> Title</h1>
            <input
              name="chatName"
              type="text"
              className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
              onChange={(e) => handleOnChange(e)}
            ></input>
          </div>

          {formValue.levelOfPublicity !== 'Private' ? (
            <div className="px-[8%] text-[#5D777B] text-2xl relative ">
              <h1 className="pb-3 font-light tracking-tight">
                Max Participant
              </h1>
              <input
                name="maxParticipant"
                type="number"
                min="1"
                max="1000"
                className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
                onChange={(e) => handleOnChange(e)}
              ></input>
              {/* 이거 위치 */}
              <p className=" text-[#5D777B] text-2xl absolute right-[15%] bottom-[6.4vh] font-light">
                / 1000
              </p>
            </div>
          ) : (
            <></>
          )}
          {formValue.levelOfPublicity !== 'Private' ? (
            <div className="px-[8%] text-[#5D777B] text-2xl relative ">
              <h1 className="pb-3 font-light tracking-tight"> Member</h1>
              <input
                ref={focusRef}
                id="member"
                name="member"
                type="text"
                className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
                onChange={(e) => {
                  handleRefChange(e);
                }}
                onFocus={() => {
                  setMemberFocus(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    userSearch();
                  }
                }}
              ></input>
              {userList?.length != 0 && memberFocus && (
                <div
                  id="search-user-list"
                  ref={focusRef}
                  className="flex flex-col w-[22vw] h-[45vh] shadow-xl px-12 py-16 bg-[#F8F8F8] rounded-[30px] mx-auto items-center justify-center relative z-10 mt-8"
                >
                  <div className="overflow-y-auto w-full h-full inset-0 px-4">
                    {/* 일단 친구목록 뜨게 해뒀는데 (전체유저 검색..? 얘기 나눴던 것 같은데 가물) 
                    여기서 플러스버튼 누르면 members 배열에 추가되는 식으로 해서 전달해야 할 것 같아여 */}
                    {userList.map((item) => (
                      <SearchUserList
                        key={item.id}
                        props={item}
                        isDuplicated={isUserDuplicated(item)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}

          {formValue.levelOfPublicity === 'Protected' ? (
            <div className="px-[8%] text-[#5D777B] text-2xl">
              <h1 className="pb-3 font-light tracking-tight"> Password </h1>
              <input
                name="password"
                type="text"
                className="px-5 align-middle justify-center rounded-[50px] shadow-lg w-[100%] h-[3rem] font-light"
                onChange={(e) => handleOnChange(e)}
              ></input>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="grid-rows-end">
          <button
            type="button"
            className="right-0  inline-block float-right mr-[10%] mb-[5%]"
            // 이런식으로 전달하는게 맞겠쥬?
            // onClick={() => ChatSocket.emit('createRoom', formValue)}
            onClick={() => console.log(formValue)}
          >
            <p className="font-sans not-italic font-[320] text-2xl leading-[41px] tracking-tighter text-[#5D777B]">
              Create
            </p>
          </button>
        </div>

        <button
          id="modal-close-button"
          className="absolute top-3 right-7 p-0 text-gray-400 text-lg"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </div>
  );
};
