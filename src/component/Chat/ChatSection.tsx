import { ChatList } from "../ChatList/ChatList"
import { ChatRoom, chatRoomList } from "../ChatList/ChatRoom"
import { ServiceTitle } from "../Main/ServiceTitle"
import { Chatting } from "./Chatting"

export interface chatForm {
    id: number;
    nickname: string;
    text: string;
     sender: string;
}

export const ChatSection = () => {

    const data:chatForm[] = [
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'jina'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test2',
            sender: 'me'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test3',
            sender: 'jina'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'me'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'jina'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'jina'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'jina'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'jina'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'jina'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'jina'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'jina'
        },
        {
            id: 1,
            nickname: 'nick1',
            text: 'test1',
            sender: 'jina'
        },
    ]

//     const data:chatRoomList[] = [
	// 	{
	// 		id: 1,
	// 		title: '채팅방1',
	// 		people: 2,
	// 		maxPeople: 4,
	// 		permission: 'public',
	// },
// 	{
// 		id: 2,
// 		title: '채팅방2',
// 		people: 1,
// 		maxPeople: 1,
// 		permission: 'private',
// 	},
// 	{
// 		id: 3,
// 		title: '채팅방3',
// 		people: 2,
// 		maxPeople: 2,
// 		permission: 'protected',
// 	},
// 	{
// 		id: 4,
// 		title: '채팅방4',
// 		people: 2,
// 		maxPeople: 4,
// 		permission: 'public',
// 	},
// 	{
// 		id: 5,
// 		title: '채팅방5',
// 		people: 2,
// 		maxPeople: 4,
// 		permission: 'public',
// 	},
// 	{
// 		id: 6,
// 		title: '채팅방6',
// 		people: 2,
// 		maxPeople: 4,
// 		permission: 'public',
// 	},
// 	{
// 		id: 7,
// 		title: '채팅방7',
// 		people: 2,
// 		maxPeople: 4,
// 		permission: 'public',
// 	},
// 	{
// 		id: 8,
// 		title: '채팅방7',
// 		people: 2,
// 		maxPeople: 4,
// 		permission: 'public',
// 	},
// 	{
// 		id: 9,
// 		title: '채팅방7',
// 		people: 2,
// 		maxPeople: 4,
// 		permission: 'public',
// 	},
// 	{
// 		id: 10,
// 		title: '채팅방7',
// 		people: 2,
// 		maxPeople: 4,
// 		permission: 'public',
// 	},

// ]
    
    return (
        <div id="chat-section" className="col-span-2 flex flex-col w-full flex-grow">
            <div className='flex'>
                <ServiceTitle title="Chat" />
            </div>
            <div className="rounded-3xl px-[12vw] z-10">
                <ChatList key='1' props={{
			id: 1,
			title: '채팅방1',
			people: 2,
			maxPeople: 4,
			permission: 'public',
	}}></ChatList>
            </div>
      
            <div className="rounded-3xl shadow-xl h-[50%] relative flex justify-center">
                <div className='w-full h-[85%]  justify-between overflow-y-auto py-3 items-center z-10'>
					{
                        //here
						data.map((item) => 
						<Chatting key={item.id} props={item} /> 
						)
					}
				</div>
                <input type="text" className="text-xl absolute px-5 bottom-[5%] rounded-[50px] shadow-lg w-[80%] h-[3rem] bg-[#D9D9D9] justify-center " ></input>
            </div>
        </div>

    )
}