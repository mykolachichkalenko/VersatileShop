import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import React, {useState, type ChangeEvent, useEffect} from "react";

interface AddProductTitleProps {
    setTitle: React.Dispatch<React.SetStateAction<string | null>>
}

export default function AddProductTitle({setTitle}: AddProductTitleProps) {
    const [titleName, setTitleName] = useState("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleName(event.target.value);
    }
    useEffect(() => {
        setTitle(titleName);
    }, [titleName]);

    return (
        <div className={"relative top-10"}>
            <Label htmlFor="addProductTitleInput"
                   className={"mb-2 font-semibold"}>
                <PWithPlaypenSans>
                    {getLanguage("addProduct.productTitleLabel")}
                    (<span className={titleName.length > 90 || titleName.length === 0 ? "text-red-500" : "text-green-500"}>
                    {titleName.length}
                </span>/90)
                </PWithPlaypenSans>
            </Label>

            <Input type={"text"} id="addProductTitleInput"
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
    )
}