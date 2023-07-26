import React from "react"
import { ChatList } from "../ChatList/ChatList"
import { chatRoomList } from "../ChatList/ChatRoom"
import { ServiceTitle } from "../Main/ServiceTitle"
import { ChatSection } from "./ChatSection"
import { UserSection } from "./UserSection"

export const Chat = () => {
   

    return (
        <div className="h-screen bg-slate-100 py-5 ">
            <div className="pt-[2%] px-[8%] grid grid-cols-3 gap-20 h-[75vh] overflow-a">
                <ChatSection />
                <UserSection />
            </div>
        </div>
    )
}