import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {MessageCircleIcon} from "lucide-react";

interface ProductSellerProps {
    status?: string,
    ownerName?: string,
    isMeOwner?: boolean,
    ownerProfilePhoto ?: string,
    ownerEmail ?: string;
}

export default function ProductSeller({status, ownerName, isMeOwner,ownerProfilePhoto,ownerEmail}: ProductSellerProps) {
    return (
        <div className={"w-[96%] mt-[20px] flex flex-col"}>
            <PWithPlaypenSans className={"text-xl font-bold"}>{getLanguage("productPage.seller")}</PWithPlaypenSans>

            <div className="relative h-[80px] w-[300px] bg-white rounded-[10px] mt-[10px] flex flex-row items-center cursor-pointer">
                <div className={"w-[50px] h-[50px] ml-[10px] relative"} onClick={() => window.location.href=`/user/${ownerEmail}`}>
                    <Avatar className={"w-full h-full"} >
                        <AvatarImage src={ownerProfilePhoto} alt="@shadcn"/>
                        <AvatarFallback>SA</AvatarFallback>
                    </Avatar>

                    <Badge
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full p-0 border-2 border-white ${status === "online" ? "bg-green-500" : "bg-gray-500"}`}/>
                </div>

                <div className={"w-[170px] h-[50px] ml-[10px] overflow-hidden"} onClick={() => window.location.href=`/user/${ownerEmail}`}>
                    <p className={"text-[15px] font-bold "}>{ownerName}</p>
                    <p className={`text-[13px] font-semibold ${status === "online" ? "text-green-500" : "text-gray-500"}`}>
                        {getLanguage("productPage." + status)}
                    </p>
                </div>

                {!isMeOwner &&
                    <div onClick={() => window.location.href=`/chats/${ownerEmail}`}
                        className={"h-[40px] w-[40px] bg-blue-500 ml-[10px] flex justify-center items-center rounded-full hover:cursor-pointer hover:bg-blue-400"}>
                        <div>
                            <MessageCircleIcon className={"text-white w-[17px]"}/>
                        </div>
                    </div>}

            </div>

        </div>
    )
}