import api from "@/Configs/Api.tsx";

interface createReviewProps {
    ratingStars: number;
    reviewText: string;
    productId: number;
}

export default async function createProductReview({ratingStars, reviewText, productId}: createReviewProps) {
    const res = await api.post("/api/product/review/create", {
        productId: productId,
        rating: ratingStars,
        comment: reviewText
    });
    return res.data;
}