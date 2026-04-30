import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function UserReviewsHeader() {
    return (
        <div className={"flex justify-center items-center w-[98%]"}>
            <DefaultHeader>
                <PWithPlaypenSans className={"text-xl font-semibold"}>{getLanguage("userPageReviews.headerTitle")}</PWithPlaypenSans>
            </DefaultHeader>
        </div>
    )
}