import "../../../Styles/DefaultComponentsStyles/DefaultComponentsStyles.css";
import NavBar from "@/components/AdditionalComponents/DefaultComponents/NavBar.tsx";
import {AuroraBackground} from "@/components/AdditionalComponents/DefaultComponents/AuroraBackground.tsx";
import {useEffect, useState} from "react";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import isAuthorized from "@/Utils/Functions/UserFuntions/isAuthorized.ts";
import setStatusOnline from "@/Utils/Functions/UserFuntions/setStatusOnline.ts";


export default function DefaultComponent({children}: { children: React.ReactNode }) {
    const [accessAllowed, setAccessAllowed] = useState<boolean | null>(null);
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const [currentURL, setCurrentURL] = useState("");

    const secureURLs = ["/profile", "/favorites", "/chats", "/my-products", "/my-products/add", "/my-products/edit/*", "/ai-service","/chats/*"];

    const getAuthorizedAndCurrentURL = async () => {
        setCurrentURL(window.location.pathname);
        setAuthorized(await isAuthorized());
    }

    useEffect(() => {
        getAuthorizedAndCurrentURL();
        setStatusOnline();
    }, []);

    useEffect(() => {
        if (!currentURL) return;

        const isMyProductsEditPageURL = currentURL.slice(0, 17) === "/my-products/edit" && currentURL.length > 17;
        const isChatWithUserPageURL = currentURL.slice(0,7) === "/chats/" && currentURL.length > 7;

        if (secureURLs.includes(currentURL) || isMyProductsEditPageURL || isChatWithUserPageURL) {
            if (authorized === null) return;
            if (authorized) {
                setAccessAllowed(true);
            } else {
                window.location.href = "/registration";
            }
        } else {
            setAccessAllowed(true);
        }

    }, [authorized, currentURL]);

    return (
        <div className={"defaultComponentsContainer"}>
            <AuroraBackground/>

            {accessAllowed !== null ?
                <div className={"defaultComponentsChildrenContainer"}>
                    {children}
                </div>
                :
                <div className={"absolute top-[40%] left-[48%]"}>
                    <PageLoader/>
                </div>
            }

            <NavBar authorized={authorized}/>
        </div>
    )
}