import {Badge} from "@/components/ui/badge.tsx";
import {useEffect, useState} from "react";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Flag, Heart} from "lucide-react";
import setProductLiked from "@/Utils/Functions/ProductFunctions/setProductLiked.ts";
import ProductReport from "@/components/AdditionalComponents/FormComponents/ReportsContainers/CreateReport.tsx";

interface ProductAdditionalProps {
    condition?: string,
    myEmail?: string,
    id?: number,
    ownerEmail?: string,
    isLiked: boolean
}

export default function ProductAdditional({condition, myEmail, id, ownerEmail, isLiked}: ProductAdditionalProps) {
    const [styles, setStyles] = useState<string>("");
    const [liked, setLiked] = useState<boolean>(false);
    const [allowed, setAllowed] = useState<boolean>(true);

    const [productReportOpen, setProductReportOpen] = useState<boolean>(false);

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);

    useEffect(() => {
        if (condition === "new") {
            setStyles("bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm");
        } else {
            setStyles("bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm");
        }
    }, [condition]);

    const setProductLikedHandle = async (value: boolean) => {
        if (!allowed) return;

        setAllowed(false);
        setLiked(value);
        await setProductLiked({id: id, liked: value, email: myEmail});
        setAllowed(true);
    }
    return (
        <div className={"w-[96%] mt-[20px] flex flex-row items-center gap-4"}>
            <Badge
                className={styles}
            >
                {getLanguage("productPage.condition." + (condition === "new" ? "new" : "used"))}
            </Badge>

            {!myEmail || myEmail.trim() === "" || myEmail === ownerEmail ? null : (

                <>
                    <div
                        onClick={() => setProductLikedHandle(!liked)}
                        className={`group rounded-full p-3 cursor-pointer`}
                    >
                        <Heart
                            className={`w-5 h-5 transition
                  ${liked
                                ? "text-red-600 fill-red-600"
                                : "text-white fill-white "}`}/>
                    </div>
                    <div className={`group rounded-full p-3 cursor-pointer`} onClick={() => setProductReportOpen(true)}>
                        <Flag className={"w-5 h-5 transition text-red-600 group-hover:fill-red-600"}/>
                    </div>
                </>

            )
            }

            <ProductReport isOpen={productReportOpen} setIsOpen={setProductReportOpen} productId={id} type={"product"}/>
        </div>
    );
}