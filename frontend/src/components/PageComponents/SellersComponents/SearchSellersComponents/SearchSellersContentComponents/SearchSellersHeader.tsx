import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function SearchSellersHeader(){

    return(
      <DefaultHeader>
          <PWithPlaypenSans className={"text-xl font-semibold"}>{getLanguage("sellersSearchPage.title")}</PWithPlaypenSans>
      </DefaultHeader>
    );
}