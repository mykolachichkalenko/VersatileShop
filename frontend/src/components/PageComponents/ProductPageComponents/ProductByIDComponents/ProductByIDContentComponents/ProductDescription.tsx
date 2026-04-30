import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";

interface ProductDescriptionProps {
    description?: string,
}
export default function ProductDescription({description}: ProductDescriptionProps) {
    return(
        <div className={"w-[96%] mt-[10px] relative flex flex-col"}>
            <PWithPlaypenSans className={"text-xl font-bold"}>{getLanguage("productPage.description")}</PWithPlaypenSans>
            <p className={"text-gray-600 break-all"}>{description}</p>
        </div>
    );
}