import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function ProductReviewsHeader(){

    return(
      <DefaultHeader>
            <PWithPlaypenSans className={"text-[20px] font-semibold mr-[40px]"}>{getLanguage("review.product.header")}</PWithPlaypenSans>
      </DefaultHeader>
    );
}