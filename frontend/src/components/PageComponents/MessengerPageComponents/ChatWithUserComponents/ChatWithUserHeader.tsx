import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {useEffect, useState} from "react";
import type UserChatInfo from "@/Utils/Interfaces/UserChatInfo.ts";
import getUserChatInfo from "@/Utils/Functions/ChatFunctions/getUserChatInfo.ts";

interface ChatWithUserHeaderProps {
    userEmail: string | undefined;
    socketTypingRef?: React.RefObject<WebSocket | null>;
    isTyping: boolean;
    setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatWithUserHeader({userEmail, isTyping, setIsTyping}: ChatWithUserHeaderProps) {
    const [userInfo, setUserInfo] = useState<UserChatInfo | null>(null);
    const onlineStatus = "online";

    const setUserInfoFromEmail = async () => {
        const data = await getUserChatInfo({userEmail: userEmail?.trim() || "null"});
        setUserInfo(data);
    }

    useEffect(() => {
        let isRunning = false;
        let isMounted = true;

        const run = async () => {
            if (isRunning || !isMounted) return;

            isRunning = true;
            try {
                await setUserInfoFromEmail();
            } finally {
                isRunning = false;
            }
        };

        run();

        const interval = setInterval(() => {
            run();
        }, 2000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (!isTyping) return;

        const timeout = setTimeout(() => {
            setIsTyping(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [isTyping]);

    return (
        <DefaultHeader>
            {userInfo ?
                <div className={"h-[80px] flex flex-row items-center justify-center gap-[10px]"}>
                    <div className={"relative w-[60px] h-[60px]"}>
                        <img className={"w-[60px] h-[60px] rounded-full"}
                             src={userInfo.userAvatar}/>
                        <div
                            className={`w-[10px] h-[10px] rounded-full ${userInfo.userStatus === onlineStatus ? "bg-green-500" : "bg-gray-500"} absolute bottom-0 right-0`}/>
                    </div>

                    <div>
                        <PWithPlaypenSans className={"mt-[5px]"}>{userInfo.userName}</PWithPlaypenSans>
                        <p className={isTyping ? "text-blue-500" : userInfo.userStatus === onlineStatus ? "text-green-500" : "text-gray-500"}>
                            {isTyping ? getLanguage("chatWithUserPage.typing") : getLanguage(`chatWithUserPage.${userInfo.userStatus}`)}</p>
                    </div>
                </div>
                :
                <PWithPlaypenSans>{getLanguage("chatWithUserPage.titleNotFound")}</PWithPlaypenSans>
            }
        </DefaultHeader>
    );
}
