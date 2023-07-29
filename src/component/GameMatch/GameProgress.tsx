import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { newMatching } from '../../atom/game';
import { ProgressBar } from './ProgressBar';

export const GameProgress = () => {
	const [matching, setMatching] = useRecoilState(newMatching);
	const [progress, setProgress] = React.useState(0);
	let interval: any = undefined;
	
	useEffect(() => {
		if(matching) {
			interval = setInterval(() => {
				setProgress((prev) => prev + 1);
			}, 50);
		} 
		else {
			setProgress(0);
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		}
	}, [matching]);

	useEffect(()=> {
		if(progress === 100) {
			setProgress(0);
			clearInterval(interval);
		}
	}, [progress]);

	return (
		<div className='flex flex-col h-full w-full justify-center items-center'>
			{/*얘는 위에서 + onclicked state따라 바뀌는거*/}
			<span className='text-gray-500 text-2xl mb-2'>Matching...</span>
			<div className='flex flex-col w-full h-14'>
				<ProgressBar progress={progress} />
			</div>
		</div>
	)
}
