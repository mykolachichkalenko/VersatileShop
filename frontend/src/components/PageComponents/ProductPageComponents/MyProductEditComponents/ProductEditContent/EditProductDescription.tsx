import {Label} from "@/components/ui/label.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import React, {type ChangeEvent, useEffect, useState} from "react";

interface EditProductDescriptionProps {
    setDescription: React.Dispatch<React.SetStateAction<string | null>>,
    oldDescription?: string,
    newDescription?: string | null;
}

export default function EditProductDescription({
                                                   setDescription,
                                                   oldDescription,
                                                   newDescription
                                               }: EditProductDescriptionProps) {
    const [descriptionName, setDescriptionName] = useState<string | undefined | null>("");

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionName(event.target.value);
        setDescription(event.target.value);
    }

    useEffect(() => {
        const hasNew = (newDescription ?? "").trim().length > 0;

        if (hasNew) {
            setDescriptionName(newDescription);
        } else {
            setDescriptionName(oldDescription ?? "");
        }
    }, [oldDescription, newDescription]);


    return (
        <div className={"relative top-17"}>
            <Label htmlFor={"addProductDescriptionInput"}
                   className={"mb-2 font-semibold"}>
                <PWithPlaypenSans>
                    {getLanguage("addProduct.productDescriptionLabel")}
                    (
                    <span
                        className={(!descriptionName || descriptionName && descriptionName.trim().length > 2000 || descriptionName && descriptionName.trim().length < 20) ? "text-red-500" : "text-green-500"}>{descriptionName?.length}</span>
                    /2000)
                </PWithPlaypenSans>
            </Label>

            <Textarea id={"addProductDescriptionInput"}
                      value={descriptionName || ""}
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