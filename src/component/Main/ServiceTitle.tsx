import React from 'react'

interface ServiceTitleProps {
	title: string;
}

export const ServiceTitle = (props: ServiceTitleProps) => {
	return (
		<div className='flex w-40 h-full ml-5 items-start'>
				<span className='text-bold text-3xl text-gray-500'> { props.title } </span>
				<div className='flex mt-2'>
					<img src={require('../../public/plus.png')} 
							 alt="plus-button"
							 className='ml-2 mt-1 w-4 h-4 opacity-70' />
				</div>
		</div>
	)
}
