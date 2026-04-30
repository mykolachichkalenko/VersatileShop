import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function MyFavoriteProductsHeader(){

    return(
      <DefaultHeader>
          <PWithPlaypenSans className={"font-semibold text-xl"}>{getLanguage("myFavoriteProducts.title")}</PWithPlaypenSans>
      </DefaultHeader>
    );
}