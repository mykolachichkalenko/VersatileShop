import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function SearchPageHeader() {
    return (
            <DefaultHeader>
                <PWithPlaypenSans className={"text-xl font-semibold"}>{getLanguage("searchPage.title")}</PWithPlaypenSans>
            </DefaultHeader>
    );
}