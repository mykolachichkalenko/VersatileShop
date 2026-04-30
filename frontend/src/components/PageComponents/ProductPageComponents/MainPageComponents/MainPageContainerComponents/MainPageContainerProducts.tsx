import "./MainPageContainerProducts.css";
import type Product from "@/Utils/Interfaces/Product.ts";
import ProductCard from "@/components/AdditionalComponents/Cards/ProductCard.tsx";
import React, {useEffect, useRef} from "react";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import MainPageTitleRP
    from "@/components/PageComponents/ProductPageComponents/MainPageComponents/MainPageContainerComponents/MainPageTitleRP.tsx";
import {motion} from "framer-motion";

interface MainPageContainerProductsProps {
    products?: Product[] | null | undefined,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    isLoading: boolean
}

export default function MainPageContainerProducts({products, setPage, isLoading}: MainPageContainerProductsProps) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const lockRef = useRef(false);

    useEffect(() => {
        lockRef.current = false;
    }, [products?.length]);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !lockRef.current) {
                lockRef.current = true;
                setPage(prevPage => prevPage + 1);
            }
        });

        obs.observe(el);
        return () => obs.disconnect();
    }, [products?.length]);

    return (
        <div className={"mainPageProductsContainer"}>
            <MainPageTitleRP/>
            {products?.map(p => (
                <motion.div key={p.id}
                            whileHover={{scale: 1.03}}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}

                            onClick={() => window.location.href = "/product/" + p.id}
                >
                    <ProductCard product={p}/>
                </motion.div>
            ))}

            {isLoading && (
                <div className="col-span-full w-full flex justify-center items-center mb-3">
                    <PageLoader/>
                </div>
            )}

            {(products && products.length > 0) && <div ref={sentinelRef} style={{height: 1}}/>}
        </div>
    );
}