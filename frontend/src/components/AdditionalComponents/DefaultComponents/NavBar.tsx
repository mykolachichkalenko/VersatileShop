import {AnimatePresence, motion} from "framer-motion"
import "../../../Styles/DefaultComponentsStyles/DefaultComponentsStyles.css"
import {Home, Heart, MessageCircle, User, Brain} from 'lucide-react'
import {useEffect, useState} from "react";
import checkStatusCookieEvery3s from "@/Utils/Functions/CookieFunctions/checkStatusCookieEvery3s.ts";
import getCookie from "@/Utils/Functions/CookieFunctions/getCookie.ts";
import setCookie from "@/Utils/Functions/CookieFunctions/setCookie.ts";
import type Status from "@/Utils/Interfaces/Status.ts";
import StatusComponent from "@/components/AdditionalComponents/DefaultComponents/StatusComponent.tsx";

interface NavBarProps {
    authorized: boolean | null;
}

export default function NavBar({authorized}: NavBarProps) {
    const location = window.location.pathname;
    const [isThereCookie, setIsThereCookie] = useState<boolean>(false);
    const [currentStatus, setCurrentStatus] = useState<Status | null | undefined>(null);
    const statuses = [
        {id: "PCS", color: "green", text: "Statuses.PCSText"},
        {id: "PCE", color: "red", text: "Statuses.PCEText"},
        {id: "PDS", color: "green", text: "Statuses.PDSText"},
        {id: "PDE", color: "red", text: "Statuses.PDEText"},
        {id: "PES", color: "green", text: "Statuses.PESText"},
        {id: "PEE", color: "red", text: "Statuses.PEEText"}
    ]

    useEffect(() => {
        checkStatusCookieEvery3s({setIsThereCookies: setIsThereCookie});
    }, []);

    useEffect(() => {
        if (isThereCookie) {
            const cookie = getCookie("status");
            if (statuses.some(s => s.id === cookie)) {
                setCurrentStatus(statuses.find(s => s.id === cookie));

                const timerId = window.setTimeout(() => {
                    setIsThereCookie(false);
                    setCurrentStatus(null);
                    setCookie("status", "", 86400, "/", "Lax");
                }, 3000);

                return () => window.clearTimeout(timerId);
            } else {
                setCookie("status", "", 86400, "/", "Lax");
            }
        }

    }, [isThereCookie]);


    return (
        <div className={"navBarWrapper"}>

            <div className={"navBarContainer"}>


                <motion.div whileHover={{scale: 1.15}}
                            whileTap={{scale: 0.5}}
                            className={`navItemCircle ${location === "/" ? "navItemCircle--active" : ""}`}
                            onClick={() => window.location.href = "/"}>

                    <Home/>

                </motion.div>


                <motion.div whileHover={{scale: 1.15}}
                            whileTap={{scale: 0.5}}
                            className={`navItemCircle ${location === "/favorites" ? "navItemCircle--active" : ""}`}
                            onClick={() => window.location.href = "/favorites"}>

                    <Heart/>

                </motion.div>


                <motion.div whileHover={{scale: 1.15}}
                            whileTap={{scale: 0.5}}
                            className={`navItemCircle ${location === "/chats" ? "navItemCircle--active" : ""}`}
                            onClick={() => window.location.href = "/chats"}>

                    <MessageCircle/>

                </motion.div>


                <motion.div whileHover={{scale: 1.15}}
                            whileTap={{scale: 0.5}}
                            className={`navItemCircle ${location === "/profile" ? "navItemCircle--active" : ""}`}
                            onClick={() => window.location.href = "/profile"}>

                    <User/>

                </motion.div>

                {authorized === true &&
                    <motion.div whileHover={{scale: 1.15}}
                                whileTap={{scale: 0.5}}
                                className={`navItemCircle`}
                                onClick={() => window.location.href = "/ai-service"}>

                        <Brain/>

                    </motion.div>}
                <AnimatePresence>
                    {(isThereCookie && currentStatus) &&
                        <StatusComponent color={currentStatus.color} text={currentStatus.text}/>}
                </AnimatePresence>
            </div>
        </div>
    )
}
