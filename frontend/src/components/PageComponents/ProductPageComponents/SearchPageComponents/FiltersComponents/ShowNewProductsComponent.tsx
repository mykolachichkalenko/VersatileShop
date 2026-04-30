import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Switch} from "@/components/ui/switch.tsx";
import {useState} from "react";

interface ShowNewProductsComponentProps {
    showNewProducts: boolean;
    setShowNewProducts: (value: boolean) => void;
}
export default function ShowNewProductsComponent({showNewProducts,setShowNewProducts}: ShowNewProductsComponentProps) {
    const [isChecked, setIsChecked] = useState<boolean>(showNewProducts);

    const setCheckedValidated = (value: boolean) => {
        setIsChecked(value);
        setShowNewProducts(value);
    }

    return (
        <div className={"showNewProductsComponentContainer"}>
            <Switch
                checked={isChecked}
                onCheckedChange={(v) => setCheckedValidated(v)}/>

            <PWithPlaypenSans
                className={"showNewProductsComponentContainerShowText"}>{getLanguage(`searchPage.${isChecked ? "showNew" : "showAll"}`)}</PWithPlaypenSans>

        </div>
    )
}