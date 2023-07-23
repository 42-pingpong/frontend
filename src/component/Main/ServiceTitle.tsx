import React from 'react'

interface ServiceTitleProps {
	title: string;
}

export const ServiceTitle = (props: ServiceTitleProps) => {
	return (
		<div className='flex h-full ml-5 items-center'>
				<span className='text-bold text-[35px] text-gray-500'> { props.title } </span>
					<img src={require('../../public/plus.png')} 
							 alt="plus-button"
							 className='ml-2 mt-1 w-6 h-6 opacity-70' />
		</div>
	)
}
