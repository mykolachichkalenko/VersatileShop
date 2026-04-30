import "./MyFavoriteProductsContainer.css";
import MyFavoriteProductsHeader
    from "@/components/PageComponents/ProductPageComponents/MyFavoriteProducts/MyFavoriteProductsHeader.tsx";
import MyFavoriteProductsContent
    from "@/components/PageComponents/ProductPageComponents/MyFavoriteProducts/MyFavoriteProductsContent/MyFavoriteProductsContent.tsx";
import {useEffect, useState} from "react";
import type Product from "@/Utils/Interfaces/Product.ts";
import getMyFavoriteProducts from "@/Utils/Functions/ProductFunctions/getMyFavoriteProducts.ts";
import getMinID from "@/Utils/Functions/OtherUtilsFunctions/getMinID.ts";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function MyFavoriteProductsContainer() {
    const [products, setProducts] = useState<Product[] | undefined>(undefined);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage(1);
        (async () => {
            setProducts(await getMyFavoriteProducts({page, minID: 0}));
        })();
    }, []);

    useEffect(() => {
        if (page <2) return;
        const minID = getMinID({products});
        (async () => {
            const data = await getMyFavoriteProducts({page, minID});
            setProducts(prevState => [...(prevState || []), ...(data || [])]);
        })();
    }, [page]);

    return (
        <div className={"myFavoriteProductsContainer"}>
            <MyFavoriteProductsHeader/>
            {products === undefined ?
                <div className={"h-full flex justify-center items-center"}>
                    <PageLoader/>
                </div>
                : products.length === 0 ?
                    <div className={"h-full flex justify-center items-center"}>
                        <PWithPlaypenSans
                            className={"text-xl text-gray-500"}>{getLanguage("myFavoriteProducts.notFound")}
                        </PWithPlaypenSans>
                    </div>
                    :
                    <MyFavoriteProductsContent products={products} setPage={setPage} page={page}/>
            }
        </div>
    )
}