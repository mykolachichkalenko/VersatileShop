import {Label} from "@/components/ui/label.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Input} from "@/components/ui/input.tsx";
import React, {type ChangeEvent, useEffect, useState} from "react";

interface AddProductTitleProps {
    setTitle: React.Dispatch<React.SetStateAction<string | null>>
    oldTitle?:string,
    newTitle?:string | null
}

export default function EditProductTitle({setTitle,oldTitle,newTitle}: AddProductTitleProps){
    const [titleName, setTitleName] = useState<string | null | undefined>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleName(event.target.value);
        setTitle(event.target.value);
    }

    useEffect(() => {
        if(newTitle && newTitle?.trim()?.length > 0){
            setTitleName(titleName);
        }else{
            setTitleName(oldTitle);
        }
    }, [oldTitle,newTitle]);


    return (
        <div className={"relative top-10"}>
            <Label htmlFor="addProductTitleInput"
                   className={"mb-2 font-semibold"}>
                <PWithPlaypenSans>
                    {getLanguage("addProduct.productTitleLabel")}
                    (<span
                    className={(!titleName || titleName && titleName.length > 90 || titleName && titleName.length === 0) ? "text-red-500" : "text-green-500"}>
                    {titleName?.length}
                </span>/90)
                </PWithPlaypenSans>
            </Label>

            <Input type={"text"} id="addProductTitleInput"
                   value={titleName || ""}
                   onChange={(event) => onChange(event)}
                   placeholder={getLanguage("addProduct.productTitlePlaceholder")}
                   className="
                        focus:outline-none
                        focus:border-blue-500
                        focus-visible:ring-2
                        focus-visible:ring-blue-500
                        focus-visible:ring-offset-0
                        w-[90%]
                        ml-2
                        bg-white/5
                        border border-white/20
                        text-black
                        placeholder:text-black/50
                      "/>
        </div>
    );
}