import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useState} from "react";
import {Slider} from "@/components/ui/slider.tsx";

interface PriceComponentProps {
    fromPrice: number;
    toPrice: number;
    setFromPrice: (price: number) => void;
    setToPrice: (price: number) => void;
}
export default function PriceComponent({fromPrice,toPrice,setFromPrice,setToPrice}: PriceComponentProps) {
    const [tempFromPrice, setTempFromPrice] =  useState(fromPrice);
    const [tempToPrice, setTempToPrice] =  useState(toPrice);

    const setFromPriceValidated = (price:number) => {
        if(price >= toPrice) return;
        if (tempFromPrice.toString().at(0) === "0") {
            setFromPrice(1);
            setTempFromPrice(1);
        }else {
            setFromPrice(price);
            setTempFromPrice(price);
        }
    }

    const setToPriceValidated = (price:number) => {
        if(price <= fromPrice) return;
        if (tempToPrice.toString().at(0) === "0") {
            setToPrice(1);
            setTempToPrice(1);
        }else {
            setToPrice(price);
            setTempToPrice(price);
        }
    }

    return (
        <div className={"searchPageFiltersContentPrice"}>
            <PWithPlaypenSans
                className={"searchPageFiltersContentPriceTitle"}>{getLanguage("searchPage.price")}</PWithPlaypenSans>

            <div className={"mt-[-7px]"}>
                <Label htmlFor={"priceFrom"}>{getLanguage("searchPage.priceFrom")}</Label>
                <Input id={"priceFrom"}
                       value={tempFromPrice}
                       type={"number"}
                       onKeyDown={(e) => {
                           if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                       }}
                       onChange={(e) => {
                           const v = e.target.value.replace(/[eE+\-]/g, "");
                           if (Number(v) <= 10000000) {
                               setFromPriceValidated(Number(v));
                           }
                       }}
                />

                <Slider
                    value={[tempFromPrice]}
                    className={"mt-2"}
                    max={10000000}
                    step={10}
                    onValueChange={(v) => setFromPriceValidated(v[0])}
                />
            </div>

            <div>
                <Label htmlFor={"priceFrom"}
                       className={"mt-2"}
                >{getLanguage("searchPage.priceTo")}</Label>
                <Input id={"priceFrom"}
                       value={tempToPrice}
                       type={"number"}
                       onKeyDown={(e) => {
                           if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                       }}
                       onChange={(e) => {
                           const v = e.target.value.replace(/[eE+\-]/g, "");
                           if (Number(v) <= 10000000) {
                               setToPriceValidated(Number(v));
                           }
                       }}
                />

                <Slider
                    value={[tempToPrice]}
                    className={"mt-2"}
                    max={10000000}
                    step={10}
                    onValueChange={(v) => setToPriceValidated(v[0])}
                />
            </div>
        </div>
    );
}