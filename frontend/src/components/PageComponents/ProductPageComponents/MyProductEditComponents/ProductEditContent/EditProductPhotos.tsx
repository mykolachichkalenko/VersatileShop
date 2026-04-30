import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import ProductPhotoAddCard from "@/components/AdditionalComponents/Cards/ProductPhotoAddCard.tsx";
import type Product from "@/Utils/Interfaces/Product.ts";


interface EditProductPhotosProps {
    setNewFirstFile: React.Dispatch<React.SetStateAction<File | null>>,
    setNewSecondFile: React.Dispatch<React.SetStateAction<File | null>>,
    setNewThirdFile: React.Dispatch<React.SetStateAction<File | null>>,
    oldProduct:Product | null;
}
export default function EditProductPhotos({setNewFirstFile,setNewSecondFile,setNewThirdFile,oldProduct}:EditProductPhotosProps){

    return (
        <div className={"addProductPhotos"}>
            <PWithPlaypenSans
                className={"font-semibold relative top-[4px] lg:top-[15px] "}>{getLanguage("addProduct.photoText")}</PWithPlaypenSans>

            <div className={"addProductPhotosContainer"}>
                <ProductPhotoAddCard id={"first"} setFile={setNewFirstFile} myPreview={oldProduct?.photoFirst}/>
                <ProductPhotoAddCard id={"second"} setFile={setNewSecondFile} myPreview={oldProduct?.photoSecond}/>
                <ProductPhotoAddCard id={"third"} setFile={setNewThirdFile} myPreview={oldProduct?.photoThird}/>
            </div>
            <PWithPlaypenSans
                className={"relative top-[-5px]"}>{getLanguage("addProduct.firstPhotoText")}</PWithPlaypenSans>
        </div>
    )
}