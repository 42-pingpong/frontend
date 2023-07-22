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
		<div className='h-full px-5 bg-green-300'>
			<div className='flex flex-col'>
				<div className='flex h-16 bg-slate-400'>
					<ServiceTitle title="Chat" />
				</div>
					<div className=" bg-white py-10 px-5 w-full h-full rounded-3xl shadow-2xl overflow-y-auto">
						<div className='grid grid-cols-2 w-full gap-3'>
							{
								data.map((item) => 
									<ChatList key={item.id} props={item} /> 
								)
							}
						</div>
					</div>
				</div>
			</div>
	)
}
