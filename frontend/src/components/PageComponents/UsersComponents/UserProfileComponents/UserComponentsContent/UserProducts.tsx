import "./UserProducts.css";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import type Product from "@/Utils/Interfaces/Product.ts";
import React, {useEffect, useRef} from "react";
import ProductCard from "@/components/AdditionalComponents/Cards/ProductCard.tsx";

interface UserProductsProps {
    productsCount?: number;
    products?: Product[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function UserProducts({productsCount, products, setPage}: UserProductsProps) {
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
                setPage(prev => prev + 1);
            }
        });

        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return (
        <div className={"userProductsContainer"}>
            <div className={"w-[90%]"}>
                <PWithPlaypenSans
                    className={"text-xl font-bold"}>{getLanguage("userPage.userProducts")}({productsCount})</PWithPlaypenSans>
            </div>
            <div className={"userProductsProductsContainer"}>
                {products?.map(p => (
                    <div onClick={() => window.location.href="/product/"+p.id} key={p.id}>
                        <ProductCard product={p}/>
                    </div>
                ))}
                <div
                    ref={sentinelRef}
                    style={{height: 20, width: 20, backgroundColor: "transparent", position: "relative"}}
                />
            </div>
        </div>
    );
}