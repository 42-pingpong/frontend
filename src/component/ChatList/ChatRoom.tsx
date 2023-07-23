import React from 'react'
import { ServiceTitle } from '../Main/ServiceTitle'
import './styles.css'
import { ChatList } from './ChatList'

export interface chatRoomList {
	id: number;
	title: string;
	people: number;
	maxPeople: number;
	permission: string;
}

export const ChatRoom = () => {
	const data:chatRoomList[] = [
		{
			id: 1,
			title: '채팅방1',
			people: 2,
			maxPeople: 4,
			permission: 'public',
	},
	{
		id: 2,
		title: '채팅방2',
		people: 1,
		maxPeople: 1,
		permission: 'private',
	},
	{
		id: 3,
		title: '채팅방3',
		people: 2,
		maxPeople: 2,
		permission: 'protected',
	},
	{
		id: 4,
		title: '채팅방4',
		people: 2,
		maxPeople: 4,
		permission: 'public',
	},
	{
		id: 5,
		title: '채팅방5',
		people: 2,
		maxPeople: 4,
		permission: 'public',
	},
	{
		id: 6,
		title: '채팅방6',
		people: 2,
		maxPeople: 4,
		permission: 'public',
	},
	{
		id: 7,
		title: '채팅방7',
		people: 2,
		maxPeople: 4,
		permission: 'public',
	},
	{
		id: 8,
		title: '채팅방7',
		people: 2,
		maxPeople: 4,
		permission: 'public',
	},
	{
		id: 9,
		title: '채팅방7',
		people: 2,
		maxPeople: 4,
		permission: 'public',
	},
	{
		id: 10,
		title: '채팅방7',
		people: 2,
		maxPeople: 4,
		permission: 'public',
	},

]

	return (
		<div className='flex flex-col h-full'>
			<div className='flex'>
				<ServiceTitle title="Chat" />
			</div>
			<div className="flex flex-grow p-10 bg-white w-[60vw] h-[50vh] md:w-full md:h-full rounded-3xl shadow-2xl ">
				<div className='grid grid-cols-2 w-full gap-y-7 gap-x-10 overflow-y-auto py-3'>
					{
						data.map((item) => 
						<ChatList key={item.id} props={item} /> 
						)
					}
				</div>
			</div>
		</div>
)
}
//	return (
//		<div className='grid grid-cols-1 grid-row-2 gap-1 h-full'>
//			<ServiceTitle title="Chat" />
//			<div className="relative bg-white py-10 px-10 w-[60vw] h-[50vh] md:w-full md:h-full rounded-3xl shadow-2xl overflow-y-auto">
//				<div className='grid grid-cols-2 w-full gap-y-7 gap-x-10'>
//					{
//						data.map((item) => 
//						<ChatList key={item.id} props={item} /> 
//						)
//					}
//				</div>
//			</div>
//		</div>
//)
//}