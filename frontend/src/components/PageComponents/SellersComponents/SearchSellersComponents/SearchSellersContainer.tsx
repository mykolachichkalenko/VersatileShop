import SearchSellersHeader
    from "@/components/PageComponents/SellersComponents/SearchSellersComponents/SearchSellersContentComponents/SearchSellersHeader.tsx";
import SearchSellersSearch
    from "@/components/PageComponents/SellersComponents/SearchSellersComponents/SearchSellersContentComponents/SearchSellersSearch.tsx";
import "./SearchSellersContainer.css";
import SearchSellersFoundSellers
    from "@/components/PageComponents/SellersComponents/SearchSellersComponents/SearchSellersContentComponents/SearchSellersFoundSellers.tsx";
import {useEffect, useState} from "react";
import type Seller from "@/Utils/Interfaces/Seller.ts";
import getSellersByEmail from "@/Utils/Functions/SellersFunctions/getSellersByEmail.ts";

export default function SearchSellersContainer() {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        if (email.trim().length === 0) return;

        (async () => {
            setSellers(await getSellersByEmail({email: email.trim()}));
        })();

    }, [email]);

    return (
        <div className={"w-full flex flex-col items-center gap-4"}>
            <div className={"w-full pl-1 pr-1 flex flex-col items-center"}>
                <SearchSellersHeader/>
            </div>

            <div className={"searchSellersSearchContainer"}>
                <SearchSellersSearch setEmail={setEmail} email={email}/>
            </div>

            <div>
                <SearchSellersFoundSellers sellers={sellers}/>
            </div>
        </div>
    );
}