import DefaultComponent from "@/components/AdditionalComponents/DefaultComponents/DefaultComponent.tsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import ProductReviewsContainer
    from "@/components/PageComponents/ReviewsPageComponents/ProductReviewsComponents/ProductReviewsContainer.tsx";

export default function ProductReviewsPage(){
    const params = useParams();

    const rawId = params.id;
    const n = rawId ? Number(rawId) : 0;
    const productId = Number.isInteger(n) && n > 0 ? n : 0;

    useEffect(() => {
        if (productId === 0) {
            window.location.href = "/";
        }
    }, [productId]);

    return(
        <DefaultComponent>
            <ProductReviewsContainer productId={productId}/>
        </DefaultComponent>
    );
}