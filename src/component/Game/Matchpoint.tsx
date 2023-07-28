import { useRecoilValue } from "recoil"
import { myScore, otherScore } from "../../atom/game"

export const Matchpoint = () => {

	const myScoreState = useRecoilValue(myScore);
	const otherScoreState = useRecoilValue(otherScore);

    return (
        <div className='flex relative md:h-20 x-auto h-14 bg-sky p-2 rounded-full shadow-md shadow-gray-300 justify-between items-center'>

			<div id='other-score' className='px-10 font-semibold text-5xl text-gray-500'>
				<span> {otherScoreState} </span>
			</div>
			<div className="px-auto text-5xl text-gray-500">
				<span> : </span>
			</div>
			<div className='px-10 font-semibold text-5xl text-gray-500'>
				<span> {myScoreState} </span>
			</div>
		</div>
    )
}