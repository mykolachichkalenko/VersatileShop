import {motion} from "framer-motion";
import {Heart, MessageCircle, Package, Star, Users} from "lucide-react";
import "./MyProfileAboutCard.css";
import type {ReactNode} from "react";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import CustomIconBG from "@/components/AdditionalComponents/SingleComponents/CustomIconBG.tsx";

interface MyProfileAboutItemProps {
    type: string;
    count?: string;
    text: string;
    email?: string;
}

interface ElementsTypes {
    id: string,
    icon: ReactNode,
    url?: string
}

export default function MyProfileAboutCard({type, count, text,email}: MyProfileAboutItemProps) {

    const types: ElementsTypes[] = [
        {
            id: "products", icon: <Package className="w-5 h-5 text-blue-500"/>, url: "/my-products"
        },
        {
            id: "favorites", icon: <Heart className="w-5 h-5 text-blue-500"/>, url: "/favorites"
        },
        {
            id: "rating", icon: <Star className="w-5 h-5 text-blue-500"/>, url: `/users/reviews/${email}`
        },
        {
            id: "sellers", icon: <Users className="w-5 h-5 text-blue-500"/>, url: "/search/sellers"
        },
        {
            id: "chat", icon: <MessageCircle className="w-5 h-5 text-blue-500"/>, url:"/chats"
        }
    ]

    function getIcon(type: string) {
        const element = types.find((el) => el.id === type);
        return element ? element.icon : null;
    }

    function getURL(type: string) {
        const element = types.find((el) => el.id === type);
        return element ? element.url : null;
    }

    return (
        <motion.div className={"myProfileAboutItem"} whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(2px)"
        }}
        onClick={() => getURL(type) ? window.location.href=`${getURL(type)}` : ""}>
            <CustomIconBG>
                {getIcon(type)}
            </CustomIconBG>

            <h1 className={"text-blue-500 font-bold text-2xl"}>{count}</h1>
            <PWithPlaypenSans className="text-xs text-muted-foreground font-medium">{text}</PWithPlaypenSans>
        </motion.div>
    )
}

