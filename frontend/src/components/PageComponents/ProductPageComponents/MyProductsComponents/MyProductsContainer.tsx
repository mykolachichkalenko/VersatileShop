import MyProductsHeader
    from "@/components/PageComponents/ProductPageComponents/MyProductsComponents/MyProductsHeader.tsx";
import "/src/components/PageComponents/ProductPageComponents/MyProductsComponents/MyProductsContainer.css"
import MyProductsItems
    from "@/components/PageComponents/ProductPageComponents/MyProductsComponents/MyProductsItems.tsx";
import {useEffect, useState} from "react";
import type Product from "@/Utils/Interfaces/Product.ts";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import getMyProducts from "@/Utils/Functions/ProductFunctions/getMyProducts.ts";
import getProductsCount from "@/Utils/Functions/ProductFunctions/getProductsCount.ts";
import getMinID from "@/Utils/Functions/OtherUtilsFunctions/getMinID.ts";

export default function MyProductsContainer() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [page, setPage] = useState<number>(0);
    const [productsCount,setProductsCount] = useState<number>(0);

    useEffect(() => {
        (async () => {
            setProductsCount(await getProductsCount());

            const safeMinId = getMinID({products});

            const data = await getMyProducts({page,lastProductId:safeMinId});
            if (!data) return;

            setProducts(prev => (prev ? [...prev, ...data] : [...data]));
        })();
    }, [page]);

    return (
        <div className={"MyProductsContainer"}>
            <MyProductsHeader count={String(productsCount)}/>
            {products ?
                <MyProductsItems products={products} page={page} setPage={setPage} setProducts={setProducts}/>
                :
                <div className={"h-[70%] flex justify-center items-center"}>
                    <PageLoader/>
                </div>
            }
        </div>
    )
}