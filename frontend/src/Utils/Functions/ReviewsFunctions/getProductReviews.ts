import type Review from "@/Utils/Interfaces/Review.ts";
import getTestReviewsProducts from "@/Utils/Functions/TestFunction/getTestReviewsProducts.ts";
import api from "@/Configs/Api.tsx";

interface getProductReviewsProps {
    productId: number;
    page: number;
    minId: number;
}

export default async function getProductReviews({productId, page, minId}: getProductReviewsProps): Promise<Review[]> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") {
        return getTestReviewsProducts({page});
    }

    const reviews = await api.post(`/api/product/reviews/${productId}`, {minId});
    return reviews.data;
}