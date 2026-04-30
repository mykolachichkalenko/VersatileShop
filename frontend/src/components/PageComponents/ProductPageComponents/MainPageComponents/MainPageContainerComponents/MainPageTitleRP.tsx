import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function MainPageTitleRP() {

    return (
        <div className={"col-span-full w-full h-[20px] mb-3"}>
            <PWithPlaypenSans
                className={"text-xl font-semibold"}>{getLanguage("mainPage.recommendationsTitle")}</PWithPlaypenSans>
        </div>
    );
}