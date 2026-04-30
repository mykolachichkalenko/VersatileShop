import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import React, {useEffect, useState} from "react";

interface AddProductCondition {
    setCondition: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function AddProductCondition({setCondition}: AddProductCondition) {
    const [conditionProduct, setConditionProduct] = useState<string | undefined>(undefined);

    const onChange = (newValue: string) => {
        setConditionProduct(newValue);
    }
    useEffect(() => {
        setCondition(conditionProduct);
    }, [conditionProduct]);

    return (
        <div className={"relative top-31"}>
            <Select
                value={conditionProduct}
                onValueChange={onChange}>
                <SelectTrigger className="
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
                        w-[180px]
                        cursor-pointer
                      ">
                    <SelectValue placeholder={getLanguage("addProduct.productConditionLabel")}/>
                </SelectTrigger>
                <SelectContent side="top">
                    <SelectGroup>
                        <SelectItem value="new"
                                    className={`cursor-pointer`}>{getLanguage("addProduct.productConditionNew")}</SelectItem>
                        <SelectItem value="used"
                                    className={"cursor-pointer"}>{getLanguage("addProduct.productConditionUsed")}</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
