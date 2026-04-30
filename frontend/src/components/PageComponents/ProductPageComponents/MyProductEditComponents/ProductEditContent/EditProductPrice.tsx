import React, {type ChangeEvent, useEffect, useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Input} from "@/components/ui/input.tsx";

interface EditProductPriceProps {
    setPrice: React.Dispatch<React.SetStateAction<string | null>>,
    oldPrice?: string | undefined | null,
    newPrice?: string | undefined | null
}

export default function EditProductPrice({setPrice, oldPrice, newPrice}: EditProductPriceProps) {
    const [priceName, setPriceName] = useState<string | undefined | null>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value.toString().length === 1 && value.toString() === "0") {
            return;
        }
        if (!value || value === "") {
            setPriceName("");
            setPrice("");
            return;
        }
        if (value.includes('e') || value.length > 11) {
            return;
        }
        setPrice(value);
        setPriceName(value);
    };


    useEffect(() => {
        if(!newPrice || newPrice.trim().length === 0){
            setPriceName(oldPrice);
        }else{
            setPriceName(newPrice);
        }
    }, [oldPrice,newPrice]);

    return (
        <div className={"relative top-24"}>
            <Label htmlFor={"addProductPriceInput"}
                   className={`mb-2 font-semibold`}>
                <PWithPlaypenSans>
                    {getLanguage("addProduct.productPriceLabel")}
                    ({"10 000 000>"}<span
                    className={Number.parseFloat(priceName as string) > 1 && Number.parseFloat(priceName as string) < 10000000 && priceName && priceName.length < 11 ? "text-green-500" : "text-red-500"}>{priceName}</span>
                    {">"}1)
                </PWithPlaypenSans>
            </Label>

            <Input type="number" id="addProductPriceInput"
                   placeholder={getLanguage("addProduct.productPricePlaceholder")}
                   onChange={(event) => onChange(event)}
                   value={priceName || ""}
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
                      "
            />
        </div>
    )
}