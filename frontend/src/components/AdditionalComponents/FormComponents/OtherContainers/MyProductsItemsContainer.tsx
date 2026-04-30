import type Product from "@/Utils/Interfaces/Product.ts";
import MyProductItem from "@/components/AdditionalComponents/Cards/MyProductCard.tsx";
import "./MyProductsItemsContainer.css";
import React, {useEffect, useRef, useState} from "react";

interface MyProductsItemsContainerProps {
    products: Product[],
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number,
    setProducts:React.Dispatch<React.SetStateAction<Product[] | null>>
}

export default function MyProductsItemsContainer({products, setPage, page,setProducts}: MyProductsItemsContainerProps) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const lockRef = useRef(false);
    const [productsDeleted,setProductsDeleted] = useState<number>(0);

    const hasMore = products.length  === ((page+1)*30) - productsDeleted;

    useEffect(() => {
        lockRef.current = false;
    }, [products.length]);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasMore && !lockRef.current) {
                lockRef.current = true;
                setPage(prev => prev + 1);
            }
        });

        obs.observe(el);
        return () => obs.disconnect();
    }, [hasMore, setPage]);

    return (
        <div className={"myProductsItemsContainer"}>
            {products.map(product => (
                <MyProductItem product={product} key={product.id} setProducts={setProducts}
                setProductsDeleted={setProductsDeleted}/>
            ))}
            <div
                 ref={sentinelRef}
                   style={{height: 20, width: 20, backgroundColor: "transparent", position: "relative"}}
            />
        </div>
    );
}
