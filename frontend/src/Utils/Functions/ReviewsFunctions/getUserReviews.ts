import api from "@/Configs/Api.tsx";
import getTestReviewsProducts from "@/Utils/Functions/TestFunction/getTestReviewsProducts.ts";
import type Review from "@/Utils/Interfaces/Review.ts";

interface getUserReviews {
    email: string;
    minId: number;
    page: number;
}

export default async function getUserReviews({email, minId, page}: getUserReviews): Promise<Review[]> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") {
        return getTestReviewsProducts({page});
    }

    const data = await api.post("/api/user/reviews", {email, minId});
    return data.data;
}