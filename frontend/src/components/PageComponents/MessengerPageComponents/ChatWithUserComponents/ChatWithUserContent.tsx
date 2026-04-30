import ChatWithUserMessages
    from "@/components/PageComponents/MessengerPageComponents/ChatWithUserComponents/ChatWithUserContent/ChatWithUserMessages.tsx";
import "./ChatWithUserContent.css";
import ChatWithUserMessageInput
    from "@/components/PageComponents/MessengerPageComponents/ChatWithUserComponents/ChatWithUserContent/ChatWithUserMessageInput.tsx";
import {useEffect, useRef, useState} from "react";
import type Message from "@/Utils/Interfaces/Message.ts";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import getMyEmail from "@/Utils/Functions/UserFuntions/getMyEmail.ts";
import getUserIDByEmail from "@/Utils/Functions/UserFuntions/getUserIDByEmail.ts";
import getMessages from "@/Utils/Functions/ChatFunctions/getMessages.ts";
import getMessagesMinID from "@/Utils/Functions/OtherUtilsFunctions/getMessagesMinID.ts";
import getLastReadID from "@/Utils/Functions/ChatFunctions/getLastReadID.ts";
import setMessagesRead from "@/Utils/Functions/ChatFunctions/setMessagesRead.ts";
import type Chat from "@/Utils/Interfaces/Chat.ts";

interface chatWithUserContentProps {
    userEmail: string;
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function ChatWithUserContent({userEmail, setIsTyping}: chatWithUserContentProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messagesLoaded, setMessagesLoaded] = useState(false);

    const [myId, setMyId] = useState<number>();
    const [userId, setUserId] = useState<number>();
    const [myEmail, setMyEmail] = useState<string>("");

    const [page, setPage] = useState(1);
    const [isNewMessageAdded, setIsNewMessageAdded] = useState(false);

    const socketRef = useRef<WebSocket | null>(null);
    const socketTypingRef = useRef<WebSocket | null>(null);
    const socketChatListRef = useRef<WebSocket | null>(null);

    const baseUrl = import.meta.env.VITE_WS_BASE_URL;

    const [isGettingNewReadMessageID, setIsGettingNewReadMessageID] = useState(false);

    useEffect(() => {
        if (!userEmail) return;

        (async () => {
            const getMyEmailRes = await getMyEmail();
            setMyEmail(getMyEmailRes);

            setMyId(await getUserIDByEmail({email: getMyEmailRes}));
            setUserId(await getUserIDByEmail({email: userEmail}));

        })()
    }, [userEmail]);

    useEffect(() => {
        if (!userId || !myId) return;

        (async () => {
            const minId = getMessagesMinID({messages});
            const nextMessages = await getMessages({page, myId, userId, minId});
            setMessages(prev => [...nextMessages, ...prev]);
            setMessagesLoaded(true);
        })();
    }, [page, myId, userId]);

    useEffect(() => {
        if (!myEmail) return;

        const socket = new WebSocket(`${baseUrl}/ws/sendMessage?email=${encodeURIComponent(myEmail)}`);
        socketRef.current = socket;

        socket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages(prev => [...prev, newMessage]);
            setIsNewMessageAdded(true);

            if (socketChatListRef && socketChatListRef.current?.readyState === WebSocket.OPEN) {
                const chatUpdated: Chat = {
                    id: newMessage.chatId,
                    userEmail: userEmail,
                    userName: "",
                    userAvatar: "",
                    updatedAt: newMessage.createdAt,
                    unreadMessagesCount: 1
                }
                socketChatListRef.current.send(JSON.stringify(chatUpdated));
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error", error);
        };

        socket.onclose = () => {
            console.log("WebSocket closed");
        };

        return () => {
            socket.close();
        };
    }, [myEmail]);


    useEffect(() => {
        if (!myEmail || !userEmail) return;

        socketChatListRef.current = new WebSocket(`${baseUrl}/ws/updateChatList?email=${encodeURIComponent(myEmail)}`);

    }, [myEmail, userEmail]);


    useEffect(() => {
        if (!myEmail || !userEmail) return;

        const socket = new WebSocket(`${baseUrl}/ws/typing?email=${encodeURIComponent(myEmail)}`);
        socketTypingRef.current = socket;


        socket.onmessage = () => {
            setIsTyping(true);
        }
        socket.onerror = (error) => {
            console.error("WebSocket error", error);
        };

        socket.onclose = () => {
            console.log("WebSocket closed");
        };

    }, [myEmail, userEmail]);

    useEffect(() => {
        if (!myId || !userId) return;

        setMessagesRead({myId, userId});

        const interval = setInterval(() => {
            if (!isGettingNewReadMessageID) {
                setIsGettingNewReadMessageID(true);

                (async () => {
                    const lastReadID = await getLastReadID({myId, userId});

                    if (lastReadID !== null) {
                        setMessages(prevState =>
                            prevState.map(message =>
                                message.id <= lastReadID
                                    ? {...message, isRead: true}
                                    : message
                            )
                        );
                    }
                    setIsGettingNewReadMessageID(false);
                })();
            }

        }, 1500);

        return () => clearInterval(interval);
    }, [myId, userId]);

    return (
        <div className={"chatWithUserContent"}>
            {(myId && messagesLoaded && userId && myId && myEmail && (myEmail !== userEmail)) &&
                <ChatWithUserMessages messages={messages}
                                      myId={myId}
                                      setPage={setPage}
                                      isNewMessageAdded={isNewMessageAdded}
                                      setIsNewMessageAdded={setIsNewMessageAdded}
                />}

            {(myId && messagesLoaded && userId && myId && myEmail && (myEmail !== userEmail)) &&
                <ChatWithUserMessageInput socket={socketRef}
                                          userId={userId}
                                          myId={myId}
                                          myEmail={myEmail}
                                          userEmail={userEmail}
                                          socketTypingRef={socketTypingRef}
                />}

            {(!myId || !messagesLoaded || !userId || !myId || !myEmail || (myEmail === userEmail)) &&
                <div className={"w-full h-full flex justify-center items-center"}><PageLoader/></div>}
        </div>
    )
}
