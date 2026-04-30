import SearchPageHeader
    from "@/components/PageComponents/ProductPageComponents/SearchPageComponents/SearchPageHeader.tsx";
import SearchPageFilters
    from "@/components/PageComponents/ProductPageComponents/SearchPageComponents/SearchPageFilters.tsx";
import {useEffect, useState} from "react";
import type Product from "@/Utils/Interfaces/Product.ts";
import SearchPageProducts
    from "@/components/PageComponents/ProductPageComponents/SearchPageComponents/SearchPageProducts.tsx";
import getProductsBySearch from "@/Utils/Functions/ProductFunctions/getProductsBySearch.ts";
import ScrollToTopButton from "@/components/AdditionalComponents/SingleComponents/ScrollToTopButton.tsx";
import type SearchFilters from "@/Utils/Interfaces/SearchFilters.ts";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

interface SearchPageContainerProps {
    searchText: string;
}

export default function SearchPageContainer({searchText}: SearchPageContainerProps) {
    const [products, setProducts] = useState<Product[] | null | undefined>(null);
    const [excludedIds, setExcludedIds] = useState<number[]>([]);
    const [isFirstUpdate, setIsFirstUpdate] = useState(true);
    const [page, setPage] = useState<number>(0);
    const [searchParams, setSearchParams] = useState<SearchFilters>({
        condition: "all",
        fromPrice: 1,
        toPrice: 10000000,
        showNewProducts: false,
        vectorDistance: 0.8
    });

    useEffect(() => {
        if (searchText.trim().length > 0) {
            (async () => {
                const newProducts = await getProductsBySearch({
                    filters: searchParams,
                    searchText: searchText,
                    excludedIds: excludedIds,
                    page: page
                });
                setExcludedIds(newProducts.map(p => p.id));
                setProducts([...(newProducts ?? [])]);
            })();
        }
    }, [searchText]);

    useEffect(() => {
        if (isFirstUpdate) {
            setIsFirstUpdate(false);
            return;
        }

        (async () => {
            setProducts([]);
            setExcludedIds([]);

            const newProducts = await getProductsBySearch({
                filters: searchParams,
                searchText: searchText,
                excludedIds: [],
                page: page
            });

            setExcludedIds(prev => {
                const merged = [...prev, ...newProducts.map(p => p.id)];
                return Array.from(new Set(merged));
            });
            setProducts(newProducts);
        })();
    }, [searchParams]);


    useEffect(() => {
        if (page === 0) return;

        (async () => {
            const newProducts = await getProductsBySearch({
                filters: searchParams,
                searchText: searchText,
                excludedIds: excludedIds,
                page: page
            });
            setExcludedIds(prev => {
                const merged = [...prev, ...newProducts.map(p => p.id)];
                return Array.from(new Set(merged));
            });

            setProducts(prev => [...(prev || []), ...(newProducts || [])]);
        })();

    }, [page]);
    return (
        <div className={" max-w-[1500px] w-[100%] justify-center items-center flex flex-col"}>
            <div className={"w-[96%] justify-center items-center flex flex-col "}>
                <SearchPageHeader/>
            </div>

            {products === null ? (
                    <div className={"h-[70vh] flex justify-center items-center"}>
                        <PageLoader/>
                    </div>
                )
                : products?.length === 0 ? (
                        <>
                            <SearchPageFilters params={searchParams} setParams={setSearchParams}/>
                            <div className={"h-[70vh] flex justify-center items-center"}>
                                <PWithPlaypenSans
                                    className={"text-xl text-gray-500"}>{getLanguage("mainPage.notFound")}</PWithPlaypenSans>
                            </div>
                        </>
                    )
                    :
                    <>
                        <SearchPageFilters params={searchParams} setParams={setSearchParams}/>
                        <div className={"w-full flex justify-center items-center "}>
                            <SearchPageProducts products={products} setPage={setPage}/>
                        </div>
                    </>}

            <ScrollToTopButton/>
        </div>
    );


}