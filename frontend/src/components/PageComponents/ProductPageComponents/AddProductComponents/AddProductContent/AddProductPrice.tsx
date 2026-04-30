import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import React, {useState, type ChangeEvent, useEffect} from "react";

interface AddProductPriceProps {
    setPrice: React.Dispatch<React.SetStateAction<string | null>>
}

export default function AddProductPrice({setPrice}: AddProductPriceProps) {
    const [priceName, setPriceName] = useState<string>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if(value.toString().length === 1 && value.toString() === "0"){
            return;
        }
        if (!value || value === "") {
            setPriceName("");
            return;
        }
        if (value.includes('e') || value.length > 11) {
            return;
        }

        setPriceName(value);
    };

    useEffect(() => {
        setPrice(priceName)
    }, [priceName]);
    return (
        <div className={"relative top-24"}>
            <Label htmlFor={"addProductPriceInput"}
                   className={`mb-2 font-semibold`}>
                <PWithPlaypenSans>
                    {getLanguage("addProduct.productPriceLabel")}
                    ({"10 000 000>"}<span
                    className={Number.parseFloat(priceName) > 1 && Number.parseFloat(priceName) <10000000 && priceName.length < 11 ? "text-green-500" : "text-red-500"}>{priceName}</span>
                    {">"}1)
                </PWithPlaypenSans>
            </Label>

            <Input type="number" id="addProductPriceInput"
                   placeholder={getLanguage("addProduct.productPricePlaceholder")}
                   onChange={(event) => onChange(event)}
                   value={priceName}
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