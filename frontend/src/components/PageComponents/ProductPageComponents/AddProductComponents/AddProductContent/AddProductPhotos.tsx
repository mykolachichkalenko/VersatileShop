import "./AddProductPhotos.css";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import ProductPhotoAddCard from "@/components/AdditionalComponents/Cards/ProductPhotoAddCard.tsx";
import React from "react";

interface AddProductPhotosProps {
    setFirstFile: React.Dispatch<React.SetStateAction<File | null>>,
    setSecondFile: React.Dispatch<React.SetStateAction<File | null>>,
    setThirdFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function AddProductPhotos({setFirstFile, setSecondFile, setThirdFile}: AddProductPhotosProps) {

    return (
        <div className={"addProductPhotos"}>
            <PWithPlaypenSans
                className={"font-semibold relative top-[4px] lg:top-[15px] "}>{getLanguage("addProduct.photoText")}</PWithPlaypenSans>

            <div className={"addProductPhotosContainer"}>
                <ProductPhotoAddCard id={"first"} setFile={setFirstFile}/>
                <ProductPhotoAddCard id={"second"} setFile={setSecondFile}/>
                <ProductPhotoAddCard id={"third"} setFile={setThirdFile} />
            </div>
            <PWithPlaypenSans  className={"relative top-[-5px]"}>{getLanguage("addProduct.firstPhotoText")}</PWithPlaypenSans>
        </div>
    )
}