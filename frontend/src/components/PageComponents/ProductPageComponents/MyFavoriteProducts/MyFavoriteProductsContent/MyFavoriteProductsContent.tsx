import "./MyFavoriteProductsContent.css";
import type Product from "@/Utils/Interfaces/Product.ts";
import ProductCard from "@/components/AdditionalComponents/Cards/ProductCard.tsx";
import {motion} from "framer-motion";
import React, {useEffect, useRef} from "react";

interface MyFavoriteProductsContentProps {
    products?: Product[] | undefined,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
}

export default function MyFavoriteProductsContent({products,setPage,page}: MyFavoriteProductsContentProps) {
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
        <div className={"myFavoriteProductsContent"}>
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

            {(products?.length && products.length > 0 && page > 0) && <div ref={sentinelRef} style={{height: 1}}/>}
        </div>
    );
}