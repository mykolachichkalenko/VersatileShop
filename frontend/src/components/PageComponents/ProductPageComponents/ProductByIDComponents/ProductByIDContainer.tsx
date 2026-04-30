import {useNavigate, useParams} from "react-router-dom";
import ProductByIDHeader
    from "@/components/PageComponents/ProductPageComponents/ProductByIDComponents/ProductByIDHeader.tsx";
import {useEffect, useState} from "react";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import ProductByIDContent
    from "@/components/PageComponents/ProductPageComponents/ProductByIDComponents/ProductByIDContent.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import type ProductLikedInformation from "@/Utils/Interfaces/ProductLikedInformation.ts";
import getProductLikedInformation from "@/Utils/Functions/ProductFunctions/getProductLikedInformation.ts";

export default function ProductByIDContainer() {
    const params = useParams();
    const navigate = useNavigate();

    const rawId = params.id;
    const n = rawId ? Number(rawId) : 0;
    const productId = Number.isInteger(n) && n > 0 ? n : 0;

    const [productInformation, setProductInformation] = useState<ProductLikedInformation | null | undefined>(undefined);

    useEffect(() => {
        if (productId === 0) {
            navigate("/", {replace: true});
        }
    }, [productId, navigate]);

    if (productId === 0) return null;

    useEffect(() => {
        (async () => {
            const data = await getProductLikedInformation({id: productId});
            setProductInformation(data);
        })();
    }, [productId]);

    return (
        <div className={"w-[100%] justify-center items-center flex flex-col"}>

            <div className={"w-[96%] justify-center items-center flex flex-col "}>
                <ProductByIDHeader/>
            </div>

            {productInformation === undefined ?
                <div className={"justify-center items-center flex relative top-[40vh] h-[80%]"}>
                    <PageLoader/>
                </div>
                : productInformation === null ?
                    <div className={"justify-center items-center flex relative top-[40vh] h-[80%]"}>
                        <PWithPlaypenSans
                            className={"text-2xl text-gray-500"}>{getLanguage("productPage.notFound")}</PWithPlaypenSans>
                    </div>
                    :
                    <ProductByIDContent product={productInformation} productId={productId}/>
            }
        </div>
    );
}