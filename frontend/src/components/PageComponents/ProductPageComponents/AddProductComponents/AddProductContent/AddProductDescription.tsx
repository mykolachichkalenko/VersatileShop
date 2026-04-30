import {Label} from "@/components/ui/label.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import React, {useState, type ChangeEvent, useEffect} from "react";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

interface AddProductDescriptionProps {
    setDescription: React.Dispatch<React.SetStateAction<string | null>>
}

    export default function AddProductDescription({setDescription}: AddProductDescriptionProps) {
    const [descriptionName, setDescriptionName] = useState("");

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionName(event.target.value);
    }
    useEffect(() => {
        setDescription(descriptionName);
    }, [descriptionName]);
        return (
            <div className={"relative top-17"}>
                <Label htmlFor={"addProductDescriptionInput"}
                       className={"mb-2 font-semibold"}>
                    <PWithPlaypenSans>
                        {getLanguage("addProduct.productDescriptionLabel")}
                        (
                        <span
                            className={descriptionName.length > 2000 || descriptionName.length < 20 ? "text-red-500" : "text-green-500"}>{descriptionName.length}</span>
                        /2000)
                    </PWithPlaypenSans>
                </Label>

                <Textarea id={"addProductDescriptionInput"}
                          onChange={(event) => onChange(event)}
                          placeholder={getLanguage("addProduct.productDescriptionPlaceholder")}
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