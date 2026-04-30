import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Button} from "@/components/ui/button.tsx";

interface MyProductsHeaderProps {
    count?: string
}

export default function MyProductsHeader({count}: MyProductsHeaderProps) {
    return (
        <DefaultHeader>
            <div className={"MyProductsHeaderContainer"}>
                <div>
                    <PWithPlaypenSans className={"font-bold text-[20px]"}>
                        {getLanguage("myProducts.title")}
                    </PWithPlaypenSans>
                    <PWithPlaypenSans className={"text-[14px] text-muted-foreground font-medium"}>
                        {count} {getLanguage("myProducts.products")}
                    </PWithPlaypenSans>
                </div>

                <div className={"MyProductsHeaderButtonContainer"}>
                    <Button className={"rounded-full bg-blue-500 hover:bg-blue-400 cursor-pointer w-10 h-10"}
                            onClick={() => window.location.href = "/my-products/add"}>
                        +
                    </Button>
                </div>
            </div>
        </DefaultHeader>
    );
}
