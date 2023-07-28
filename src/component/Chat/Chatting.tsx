import { chatForm } from "./ChatSection"

export const Chatting = ({ props }: {props: chatForm}) => {
    return props.sender !== 'me' ? (
        <div className="flex">
            
        <div className='w-14 h-14 rounded-full border-2 flex mb-[2.5%]'>
				<img src={require('../../public/soo.png')} />
</ div>
            
            <div className="text-xl mb-[2.5%] px-5 rounded-[50px] shadow-lg w-[30vw] h-[3rem] bg-[#D9D9D9] justify-center mx-[2.5%]">
                <span> {props.text} </span>
        </div>
            </div> ) : (
            <div className="text-xl mb-[2.5%] px-5 rounded-[50px] shadow-lg w-[30vw] h-[3rem] bg-[#9D9D9D] justify-center mx-[2.5%] ml-auto">
                <span> {props.text} </span>

        </div>
    )
}   