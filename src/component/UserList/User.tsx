import React from 'react'
import { userList } from './UserList'

export const User = ({props}: {props: userList}) => {
	return (
		<div className="flex w-full h-20 bg-sky rounded-full my-3 shadow-md shadow-gray-300 items-center p-4 justify-between">
			{/*보더는 나중에 뺄까*/}
			<div className='w-14 h-14 rounded-full border-2'>
				<img src={require('../../public/soo.png')} />
			</div>
			<div className='flex w-1/2'>
				<span className='text-gray-500 text-xl'>{props.name}</span>
			</div>
			<div className='flex w-10 h-6'>
			<img src={require('../../public/plane.png')}
						className='ml-3'/>
			</div>
			<div className={`${props.status === 'online' ? 'bg-green-400' : 
												( props.status === 'offline' ? 'bg-red-400' : 'bg-blue-400 ')} w-5 h-5 mr-3 rounded-full `}>
			</div>
		</div>
	)
}
