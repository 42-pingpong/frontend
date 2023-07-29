import React from "react"
import { ChatSection } from "./ChatSection"
import { UserSection } from "./UserSection"

export const Chat = () => {

    return (
        <div className="h-screen bg-slate-100 py-5 ">
            <div className="pt-[2%] px-[8%] grid grid-cols-3 grid-rows-6 gap-20 w-full h-[80vh]">
                <div className="col-span-2 row-span-6">
                    <ChatSection />
                </div>
                <div className="col-span-1 row-span-6">
                    <UserSection />
                </div>            
            </div>
        </div>
    )
}