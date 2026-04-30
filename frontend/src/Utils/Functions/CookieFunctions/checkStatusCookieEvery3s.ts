import getCookie from "@/Utils/Functions/CookieFunctions/getCookie.ts";
import React from "react";

interface checkStatusCookieEvery3sProps{
    setIsThereCookies:React.Dispatch<React.SetStateAction<boolean>>
}
export default function checkStatusCookieEvery3s({setIsThereCookies}:checkStatusCookieEvery3sProps){
    const timer = setInterval(() => {
        const status = getCookie("status");
        if (status) {
            setIsThereCookies(true);
        }
    }, 2000);

    return () => clearInterval(timer);
}