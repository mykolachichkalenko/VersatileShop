import type AverageRatingAndReviewsCount from "@/Utils/Interfaces/AverageRatingAndReviewsCount.ts";
import api from "@/Configs/Api.tsx";

interface getProductAverageRatingAndReviewsCountProps {
    productId: number;
}

export default async function getProductAverageRatingAndReviewsCount({productId}: getProductAverageRatingAndReviewsCountProps): Promise<AverageRatingAndReviewsCount | null> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (baseUrl === "test") {
        return {
            averageRating: 4.5,
            reviewsCount: 10
        };
    }
    const averageRatingAndReviewsCount = await api.get(`/api/product/reviews/average-rating-and-reviews-count/${productId}`);
    return averageRatingAndReviewsCount.data;
}