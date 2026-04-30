import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function AddProductHeader(){
    return(
      <DefaultHeader>
          <div>
              <PWithPlaypenSans className={"font-bold text-[20px]"}>
                  {getLanguage("addProduct.title")}
              </PWithPlaypenSans>
          </div>
      </DefaultHeader>
    );
}