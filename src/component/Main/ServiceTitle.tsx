import React from 'react'
import { useRecoilState } from 'recoil';
import { newMatching } from '../../atom/game';

interface ServiceTitleProps {
	title: string;
}

export const ServiceTitle = (props: ServiceTitleProps) => {
	const [matching, setMatching] = useRecoilState(newMatching);
	return (
		<div className='flex h-full ml-5 pb-1 mt-0 items-start'>
			<span className='text-bold text-[38px] text-gray-500'> {props.title} </span>
			<div className='items-center justify-center flex h-full'>
				<img src={require('../../public/plus.png')}
					alt="plus-button"
					className='ml-3 w-6 h-6 opacity-70 '
					onClick={() => props.title === 'Game' ? setMatching(!matching) : null} />
			</div>
		</div>
	)
}
