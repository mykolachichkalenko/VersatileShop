import {useParams} from "react-router-dom";
import ChatWithUserHeader
    from "@/components/PageComponents/MessengerPageComponents/ChatWithUserComponents/ChatWithUserHeader.tsx";
import ChatWithUserContent
    from "@/components/PageComponents/MessengerPageComponents/ChatWithUserComponents/ChatWithUserContent.tsx";
import {useEffect, useState} from "react";
import type IsBlock from "@/Utils/Interfaces/IsBlock.ts";
import getIsBlocked from "@/Utils/Functions/ChatFunctions/getIsBlocked.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {Button} from "@/components/ui/button.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import unBlockUserByEmail from "@/Utils/Functions/UserFuntions/unBlockUserByEmail.ts";

export default function ChatWithUserContainer() {
    const {userEmail} = useParams();
    const [isBlocked, setIsBlocked] = useState<IsBlock | null>(null);

    const [isTyping, setIsTyping] = useState(false);


    const unBlockUser = () => {
        if (!userEmail) return;
        unBlockUserByEmail({email: userEmail});
    }

    useEffect(() => {
        if (!userEmail) return;

        let isMounted = true;
        let isRunning = false;
        let timeoutId: ReturnType<typeof setTimeout>;

        const run = async () => {
            if (!isMounted || isRunning) return;

            isRunning = true;
            try {
                const res = await getIsBlocked({userEmail});
                if (isMounted) {
                    setIsBlocked(res);
                }
            } finally {
                isRunning = false;
                if (isMounted) {
                    timeoutId = setTimeout(run, 3000);
                }
            }
        };

        run();

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [userEmail]);

    return (
        <>
            {(isBlocked !== null && userEmail && !isBlocked.isUserBlocked && !isBlocked.isMeBlocked) ?
                <>
                    <div className={"flex flex-col items-center overflow-hidden"}>
                        <div className={"w-[98vw] flex flex-col items-center"}>
                            <ChatWithUserHeader userEmail={userEmail} isTyping={isTyping} setIsTyping={setIsTyping}/>
                        </div>

                        <ChatWithUserContent userEmail={userEmail} setIsTyping={setIsTyping}/>
                    </div>
                </>
                :
                <div>

                </div>}

            {isBlocked?.isUserBlocked ?
                <div className={"flex h-[100vh] items-center justify-center flex-col gap-1"}>
                    <PWithPlaypenSans
                        className={"text-red-500 text-xl font-semibold wrap-break-word"}>{getLanguage("chatWithUserPage.youBlockedUser")}
                    </PWithPlaypenSans>
                    <Button onClick={() => unBlockUser()}
                            className={"bg-red-300 hover:bg-red-600 cursor-pointer"}>{getLanguage("chatWithUserPage.unBlockUserTitle")}
                    </Button>
                </div>
                : isBlocked?.isMeBlocked &&
                <div className={"flex h-[100vh] items-center justify-center"}>
                    <PWithPlaypenSans className={"text-red-500 text-xl font-semibold wrap-break-word"}>
                        {getLanguage("chatWithUserPage.userBlockedYou")}
                    </PWithPlaypenSans>
                </div>}
        </>);
}