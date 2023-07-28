import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ballX, ballY, ballSpeedX, ballSpeedY, otherScore, myScore, myPaddle, otherPaddle } from '../../atom/game'

export const PongGame = () => {

	const paddleHeight = 120;
	const paddleWidth = 25;
	const ballSize = 30;

	const containerWidth = 1400;
	const containerHeight = 830;

	const [myPaddleState, setMyPaddleState] = useRecoilState(myPaddle);
	const [otherPaddleState, setOtherPaddleState] = useRecoilState(otherPaddle);

	const [loop, setLoop] = useState(false);

	const [ballXState, setBallXState] = useRecoilState(ballX);
	const [ballYState, setBallYState] = useRecoilState(ballY);
	const [ballSpeedXState, setBallSpeedXState] = useRecoilState(ballSpeedX);
	const [ballSpeedYState, setBallSpeedYState] = useRecoilState(ballSpeedY);

	const [myScoreState, setMyScoreState] = useRecoilState(myScore);
	const [otherScoreState, setOtherScoreState] = useRecoilState(otherScore);

	/** 키 이벤트 (테스트 하려고 ws 키 넣었는데 게임 연결하면 paddle2(위아래 화살표) 만 해도 될 것 같음) */
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			setOtherPaddleState((prevY) => Math.max(prevY - 30, 0));
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			setOtherPaddleState((prevY) => Math.min(prevY + 30, containerHeight - paddleHeight));
		}

		else if (e.key === 'w') {
			setMyPaddleState((prevY) => Math.max(prevY - 30, 0));
		} else if (e.key === 's') {
			setMyPaddleState((prevY) => Math.min(prevY + 30, containerHeight - paddleHeight));
		}
	};


	const handleBallCollisions = () => {
		if (
			ballXState <= paddleWidth &&
			ballYState + ballSize >= myPaddleState && 
			ballYState <= myPaddleState + paddleHeight
		) {
			setBallSpeedXState((prevSpeedX) => -prevSpeedX);
		} else if (
			ballXState + ballSize >= containerWidth - paddleWidth &&
			ballYState + ballSize >= otherPaddleState &&
			ballYState <= otherPaddleState + paddleHeight
		) {
			setBallSpeedXState((prevSpeedX) => -prevSpeedX);
		}

	};

	const handleBallOutOfBound = () => {
		if (ballXState <= 0 || ballXState >= containerWidth - ballSize) {
			let correctedX = ballXState < 0 ? 0 : containerHeight - ballSize;
			ballXState === 0 ? setMyScoreState((prev) => prev + 1) : setOtherScoreState((prev) => prev + 1)
			setBallXState(correctedX);
			setBallSpeedXState((prevSpeedX) => -prevSpeedX);
		}
		
		if (ballYState < 0 || ballYState > containerHeight - ballSize) {
			let correctedY = ballYState < 0 ? 0 : containerHeight - ballSize;

			setBallYState(correctedY);

			setBallSpeedYState((prevSpeedY) => -prevSpeedY);
		}
	};

useEffect(() => {
	window.addEventListener('keydown', handleKeyDown);
	const interval = setInterval(() => {
		setLoop(true);
}, 30);

	return () => {
		window.removeEventListener('keydown', handleKeyDown);
		clearInterval(interval);;
	};
}, []);

	useEffect(() => {
		setBallXState((prevX) => prevX + ballSpeedXState);
		setBallYState((prevY) => prevY + ballSpeedYState);
		setLoop(false);
		
	}, [loop])

	useEffect(() => {
		console.log(ballXState, ballY);
		handleBallOutOfBound();
		handleBallCollisions();
	}, [ballXState, ballYState]
	)

	return (
		<div className='pong-game-container'>
			<div className="pong-game">
				<div className="absolute w-[25px] h-[125px] bg-[#97D2DD] rounded-[10px]" style={{ top: myPaddleState }}></div>
				<div className="absolute w-[25px] h-[125px] bg-[#97D2DD] rounded-[10px]" style={{ top: otherPaddleState, left: containerWidth  - paddleWidth }}></div>
				<div className="absolute w-[30px] h-[30px] bg-[#727DE3] rounded-[50%]" style={{ top: ballYState, left: ballXState }} ></div>
			</div>
		</div>
	);
};
