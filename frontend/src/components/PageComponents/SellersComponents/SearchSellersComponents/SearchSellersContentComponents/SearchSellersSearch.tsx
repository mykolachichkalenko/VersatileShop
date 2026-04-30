import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import type {SetStateAction} from "react";

interface SearchSellersSearchProps {
    setEmail:React.Dispatch<SetStateAction<string>>;
    email:string;
}
export default function SearchSellersSearch({setEmail,email}:SearchSellersSearchProps){

    return(
        <div className={"w-[100%] mt-6"}>
            <form className="customSearchDiv" onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="customSearch__inputWithoutAdaptive" placeholder={getLanguage("sellersSearchPage.searchPlaceholder")} value={email}
                       onChange={(event) => setEmail(event.target.value)}/>
            </form>
        </div>
    )
}