import ChatsHeader from "@/components/PageComponents/MessengerPageComponents/ChatsComponents/ChatsHeader.tsx";
import ChatsContent from "@/components/PageComponents/MessengerPageComponents/ChatsComponents/ChatsContent.tsx";
import {useEffect, useState} from "react";
import type Chat from "@/Utils/Interfaces/Chat.ts";
import getChats from "@/Utils/Functions/ChatFunctions/getChats.ts";
import getMyEmail from "@/Utils/Functions/UserFuntions/getMyEmail.ts";

export default function ChatsContainer() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [myEmail, setMyEmail] = useState<string>("");

    const baseUrl = import.meta.env.VITE_WS_BASE_URL;

    useEffect(() => {
        (async () => {
            const res = await getChats();
            setChats(res);

            const myEmailRes = await getMyEmail();
            setMyEmail(myEmailRes);
        })();
    }, []);

    useEffect(() => {
        if (!myEmail) return;

        const socket = new WebSocket(`${baseUrl}/ws/updateChatList?email=${encodeURIComponent(myEmail)}`);

        socket.onmessage = (event) => {
            const updatedChat = JSON.parse(event.data);

            setChats((prevChats) => {
                const index = prevChats.findIndex(
                    chat => chat.id === updatedChat.id && chat.userEmail === updatedChat.userEmail
                );

                if (index !== -1) {
                    const newChats = [...prevChats];

                    newChats[index] = {
                        ...newChats[index],
                        unreadMessagesCount: (newChats[index].unreadMessagesCount ?? 0) + 1,
                        updatedAt: updatedChat.updatedAt
                    };

                    return newChats;
                }

                return [updatedChat, ...prevChats];
            });
        };

    }, [myEmail]);

    return (
        <div className={"w-full h-full flex flex-col items-center"}>
            <div className={"w-[98%] flex flex-col items-center"}>
                <ChatsHeader/>
            </div>
            <ChatsContent chats={chats}/>
        </div>
    );
}