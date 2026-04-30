import "./MessageCard.css";
import type Message from "@/Utils/Interfaces/Message.ts";
import getFormatedTime from "@/Utils/Functions/OtherUtilsFunctions/getFormatedTime.ts";

interface MessageCardProps {
    message: Message;
    myId: number;
}

export default function MessageCard({message, myId}: MessageCardProps) {
    const isMyMessage = message.senderId === myId;

    return (
        <div className={`messageCardContainer ${isMyMessage ? "my" : ""}`}>
            <div className={isMyMessage ? "myMessageCard" : "userMessageCard"}>
                {message.type === "text" ? (
                    <p>{message.content}</p>
                ) : (
                    <img src={message.content} alt="Image message"/>
                )}

                {isMyMessage ? (
                    <div className="myMessageTimeAndStatusContainer">
                        <span className="text-[10px] text-gray-500 justify-start w-[130px]">{getFormatedTime({time: message.createdAt})}</span>
                        <span className="text-[10px] text-gray-800">
                            {message.isRead ? "✓✓" : "✓"}
                        </span>
                    </div>
                ) : (
                    <div className="userMessageTimeContainer">
                        <span className="text-[10px] text-gray-500">{getFormatedTime({time: message.createdAt})}</span>
                    </div>
                )}
            </div>
        </div>
    );
}