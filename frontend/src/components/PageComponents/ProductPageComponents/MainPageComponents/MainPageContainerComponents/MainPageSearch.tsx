import "./MainPageSearch.css";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import CustomSearch from "@/components/AdditionalComponents/SingleComponents/CustomSearch.tsx";

export default function MainPageSearch(){
    return(
      <div className={"mainPageSearchContainer"}>
         <CustomSearch placeholder={getLanguage("mainPage.searchPlaceholder")}/>
      </div>
    );
}