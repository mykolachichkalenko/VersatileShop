import type Review from "@/Utils/Interfaces/Review.ts";
import api from "@/Configs/Api.tsx";

interface createUserReviewProps {
    ratingStars: number;
    reviewText: string;
    userEmail: string;
}

export default async function createUserReview({
                                                   ratingStars,
                                                   reviewText,
                                                   userEmail
                                               }: createUserReviewProps): Promise<Review> {

    const review = await api.post("/api/user/review/create", {
        rating: ratingStars,
        comment: reviewText,
        email: userEmail
    });
    return review.data;
}