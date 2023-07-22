import React from 'react'
import { chatRoomList } from './ChatRoom'

export const ChatList = ({ props }: { props: chatRoomList }) => {
	return (
		<div className='w-full h-16 bg-red-200 p-2 rounded-full shadow-md shadow-gray-300'>
			{props.id}
			{props.title}
			{props.people}
			{props.maxPeople}
			{props.permission}
			</div>
	)
}
