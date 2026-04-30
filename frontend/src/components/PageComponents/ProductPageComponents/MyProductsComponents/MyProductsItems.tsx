import type Product from "@/Utils/Interfaces/Product.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import MyProductsItemsContainer
    from "@/components/AdditionalComponents/FormComponents/OtherContainers/MyProductsItemsContainer.tsx";
import React from "react";

interface MyProductsItemsProp {
    products?: Product[] | null | undefined,
    page:number,
    setPage:React.Dispatch<React.SetStateAction<number>>,
    setProducts:React.Dispatch<React.SetStateAction<Product[] | null>>
}

export default function MyProductsItems({products,page,setPage,setProducts}: MyProductsItemsProp) {
    return (
        <div className={"MyProductsItemsContainer"}>
            {products && products?.length > 0
                ?
                <MyProductsItemsContainer products={products} page={page} setPage={setPage} setProducts={setProducts}/>
                :
                <div className={"w-[100%] h-[80%] flex justify-center items-center"}>
                    <PWithPlaypenSans
                        className={"text-2xl font-semibold text-gray-500"}>{getLanguage("myProducts.notFound")}</PWithPlaypenSans>
                </div>}
        </div>
    );
}