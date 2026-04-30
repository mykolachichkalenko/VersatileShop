import type Chat from "@/Utils/Interfaces/Chat.ts";
import "./ChatCard.css";

interface ChatCardProps {
    chat: Chat;
}

export default function ChatCard({chat}: ChatCardProps) {
    return (
        <div className={"chatCardContainer"} onClick={() => window.location.href="/chats/" + chat.userEmail}>
            <div className={"w-[60px] h-[60px] rounded-full flex items-center relative left-2"}>
                <img src={chat.userAvatar} className={"w-[60px] h-[60px] rounded-full"}/>
            </div>
            <div className={"relative left-4 w-[150px] overflow-hidden"}>
                <p className={"text-xl font-semibold"}>{chat.userName}</p>
            </div>
            <div className={"ml-auto mr-[30px]"}>
                {chat.unreadMessagesCount > 0 &&
                    <div className={"bg-blue-500 w-[35px] flex items-center justify-center h-[35px] rounded-full"}>
                        <p className={"text-xl text-white"}>{chat.unreadMessagesCount > 9 ? "9+" : chat.unreadMessagesCount}</p>
                    </div>}
            </div>
        </div>
    );
}