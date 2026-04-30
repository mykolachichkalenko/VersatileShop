import {Button} from "@/components/ui/button.tsx";
import {PlusIcon} from "lucide-react";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import React from "react";

interface EditProductButtonProps{
    isCorrect:boolean,
    setEdit:React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditProductButton({isCorrect,setEdit}:EditProductButtonProps) {
    return (
        <div className={"relative top-[150px] left-2"}>
            <Button
                onClick={() => setEdit(true)}
                disabled={!isCorrect}
                className={"bg-green-500 cursor-pointer hover:bg-green-600"}><PlusIcon/><PWithPlaypenSans>{getLanguage("editProduct.buttonTitle")}</PWithPlaypenSans></Button>
        </div>
    )
}