import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";

export default function     ProductByIDHeader(){
    return(
        <DefaultHeader children={<PWithPlaypenSans
            className={"font-bold text-[20px]"}>{getLanguage("productPage.title")}
        </PWithPlaypenSans>}/>
    );
}