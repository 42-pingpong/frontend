import React from 'react'
import { chatRoomList } from './ChatRoom'

export const ChatList = ({ props }: { props: chatRoomList }) => {
	return (
		<div className='flex relative md:w-full md:h-24 w-60 h-14 bg-sky p-2 rounded-full shadow-md shadow-gray-300 justify-between items-center'>
			<div className='flex w-14 h-14 rounded-full bg-white justify-center items-center'>
				<p className='text-gray-500 text-xl'>{props.id}</p>
			</div>
			<div className='flex w-1/2 text-gray-500 text-2xl'>
				<span>{props.title}</span>
			</div>
			<div className='flex relative right-1 w-14 text-gray-500 text-2xl'>
				<span>{props.people} / {props.maxPeople}</span>
			</div>
			<div className='flex relative right-6 w-12 h-12 text-gray-500 text-2xl justify-center items-center'>
				{
					props.permission === 'private' ?
						<span>me</span>
						: (props.permission === 'protected' ?
							<img src={require('../../public/lock.png')} alt="lock" className='w-5 h-6 opacity-70' />
							: <span></span>)
				}
			</div>
		</div>
	)
}

