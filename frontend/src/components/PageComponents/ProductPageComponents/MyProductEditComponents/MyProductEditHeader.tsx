import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";

export default function MyProductEditHeader(){
    return(
     <DefaultHeader>
         <div>
             <PWithPlaypenSans className={"font-bold text-[20px]"}>
                 {getLanguage("editProduct.title")}
             </PWithPlaypenSans>
         </div>
     </DefaultHeader>
    )
}