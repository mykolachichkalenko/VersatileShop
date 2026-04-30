import "./ChatsContent.css";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import type Chat from "@/Utils/Interfaces/Chat.ts";
import dateArrayToMs from "@/Utils/Functions/OtherUtilsFunctions/dateArrayToMs.ts";
import ChatCard from "@/components/AdditionalComponents/Cards/ChatCard.tsx";

interface ChatsContentProps {
    chats: Chat[];
}

export default function ChatsContent({chats}: ChatsContentProps) {

    return (
        <div className={"chatsContentMainContainer"}>
            {(chats && chats.length > 0) ? (
                <div className={"chatsContentChatCardsContainer"}>
                    {
                        [...chats]
                            .sort((a, b) => dateArrayToMs(b.updatedAt) - dateArrayToMs(a.updatedAt))
                            .map(chat => (
                                <ChatCard chat={chat} key={chat.id}/>

                            ))
                    }
                </div>

            ) : (
                <div className={"w-[100%] h-[100%] absolute flex items-center justify-center"}>
                    <PWithPlaypenSans className={"text-xl text-gray-500 font-semibold"}>
                        {getLanguage("chatsPage.notFound")}
                    </PWithPlaypenSans>
                </div>
            )}
        </div>
    );
}