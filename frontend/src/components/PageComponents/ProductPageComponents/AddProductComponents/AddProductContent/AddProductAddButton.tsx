import {Button} from "@/components/ui/button.tsx";
import {PlusIcon} from "lucide-react";
import type CreateProductRequest from "@/Utils/Interfaces/CreateProductRequest.ts";
import React from "react";
import createProduct from "@/Utils/Functions/ProductFunctions/createProduct.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

interface AddProductAddButtonProps {
    isCorrect: boolean,
    setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>,
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>,
    product: CreateProductRequest
}

export default function AddProductAddButton({isCorrect, setIsCorrect, setIsAdding, product}: AddProductAddButtonProps) {

    const createNewProduct = async () => {
        await createProduct(product);
        setIsCorrect(false);
        setIsAdding(true);
    }
    return (
        <div className={"relative top-[150px] left-2"}>
            <Button
                onClick={createNewProduct}
                disabled={!isCorrect}
                className={"bg-green-500 cursor-pointer hover:bg-green-600"}><PlusIcon/><PWithPlaypenSans>{getLanguage("addProduct.addButton")}</PWithPlaypenSans></Button>
        </div>
    )
}