import React from 'react'
import { chatRoomList } from './ChatRoom'

export const ChatList = ({ props }: { props: chatRoomList }) => {
	return (
		<div className='flex relative md:w-full md:h-20 w-60 h-14 bg-sky p-2 rounded-full shadow-md shadow-gray-300 justify-between items-center'>
			<div className='flex w-14 h-14 rounded-full bg-white justify-center items-center'>
				<p className='text-gray-500 text-xl'>{props.id}</p>
			</div>
			<div className='flex w-1/2 text-gray-500 text-xl'>
				<span>{props.title}</span>
			</div>
			<div className='flex relative right-1 w-10 text-gray-500 text-xl'>
				<span>{props.people} / {props.maxPeople}</span>
			</div>
			<div className='flex relative right-4 w-8 h-8 text-gray-500 text-xl justify-center items-center'>
			{
				props.permission === 'private' ?
					<span>me</span>
				: (props.permission === 'protected' ?
					<img src={require('../../public/lock.png')} alt="lock" className='w-4 h-5 opacity-70'/>
					: <span></span>)
			}
			</div>
		</div>
	)
}

