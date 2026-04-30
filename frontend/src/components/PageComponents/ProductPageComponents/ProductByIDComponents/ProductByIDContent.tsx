import ProductImagesCarousel
    from "@/components/PageComponents/ProductPageComponents/ProductByIDComponents/ProductByIDContentComponents/ProductImagesCarousel.tsx";
import ProductTitle
    from "@/components/PageComponents/ProductPageComponents/ProductByIDComponents/ProductByIDContentComponents/ProductTitle.tsx";
import "./ProductByIDContent.css";
import {useEffect, useState} from "react";
import ProductPrice
    from "@/components/PageComponents/ProductPageComponents/ProductByIDComponents/ProductByIDContentComponents/ProductPrice.tsx";
import ProductAdditional
    from "@/components/PageComponents/ProductPageComponents/ProductByIDComponents/ProductByIDContentComponents/ProductAdditional.tsx";
import type ProductLikedInformation from "@/Utils/Interfaces/ProductLikedInformation.ts";
import ProductDescription
    from "@/components/PageComponents/ProductPageComponents/ProductByIDComponents/ProductByIDContentComponents/ProductDescription.tsx";
import ProductSeller
    from "@/components/PageComponents/ProductPageComponents/ProductByIDComponents/ProductByIDContentComponents/ProductSeller.tsx";
import ProductViewReviews
    from "@/components/PageComponents/ProductPageComponents/ProductByIDComponents/ProductByIDContentComponents/ProductViewReviews.tsx";

interface ProductByIDContentProps {
    product: ProductLikedInformation | null,
    productId: number
}

export default function ProductByIDContent({product, productId}: ProductByIDContentProps) {
    const [photos, setPhotos] = useState<string[]>([]);
    const [price, setPrice] = useState<number>(0);


    useEffect(() => {
        if (product) {
            const array = [
                product.photoFirst,
                product.photoSecond,
                product.photoThird
            ].filter((p): p is string => Boolean(p && p.trim()));

            setPhotos(array);
            setPrice(product.price);

        }
    }, [product]);

    return (
        <div className={"productByIDContent"}>
            <ProductImagesCarousel arrayPhotos={photos}/>
            <ProductTitle title={product?.title}/>
            <ProductPrice price={price}/>
            <ProductAdditional condition={product?.condition} myEmail={product?.myEmail} id={product?.id}
                               ownerEmail={product?.ownerEmail} isLiked={product?.liked ? product.liked : false}/>
            <ProductDescription description={product?.description}/>
            <ProductSeller status={product?.ownerStatus} ownerName={product?.ownerName}
                           isMeOwner={product?.ownerEmail === product?.myEmail}
                           ownerProfilePhoto={product?.ownerProfilePhoto} ownerEmail={product?.ownerEmail}/>
            <ProductViewReviews productId={productId}/>
        </div>
    );
}