import "./MainPageContainer.css";
import MainPageSearch
    from "@/components/PageComponents/ProductPageComponents/MainPageComponents/MainPageContainerComponents/MainPageSearch.tsx";
import MainPageContainerProducts
    from "@/components/PageComponents/ProductPageComponents/MainPageComponents/MainPageContainerComponents/MainPageContainerProducts.tsx";
import {useEffect, useRef, useState} from "react";
import getMyRecommendedProducts from "@/Utils/Functions/ProductFunctions/getMyRecommendedProducts.ts";
import type Product from "@/Utils/Interfaces/Product.ts";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import getMinID from "@/Utils/Functions/OtherUtilsFunctions/getMinID.ts";

export default function MainPageContainer() {
    const [products, setProducts] = useState<Product[] | null | undefined>(null);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const isDefaultFindingRef = useRef<string>("didn't set");
    const offset = useRef<number>(0);

    const setIsDefaultFindingAndOffset = (value: string,offsetValue:number) => {
        isDefaultFindingRef.current = value;
        offset.current=offsetValue;
    }

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const minId = getMinID({products});
            const allIDs = products ? products.map(product => product.id) : [];

            const data = await getMyRecommendedProducts({
                page: page,
                lastProductID: minId,
                allIDs: allIDs,
                setIsDefaultFindingAndOffset: setIsDefaultFindingAndOffset,
                isDefaultFinding: isDefaultFindingRef.current,
                offset: offset.current,
            });
            setProducts(prevState => prevState ? [...prevState, ...data] : data);
            setIsLoading(false);
        })();
    }, [page]);

    return (
        <div className={"mainPageContainer"}>
            <MainPageSearch/>
            {products && products?.length > 0 ?
                <MainPageContainerProducts products={products} setPage={setPage} isLoading={isLoading}/>
                :
                products === null ?
                    <div className={"h-[80%] flex justify-center items-center"}>
                            <PageLoader/>
                    </div>
                    :
                    <div className={"h-[80%] flex justify-center items-center"}>
                            <PWithPlaypenSans
                                className="text-gray-500 text-xl">{getLanguage("mainPage.notFound")}</PWithPlaypenSans>
                    </div>
            }
        </div>
    )
}