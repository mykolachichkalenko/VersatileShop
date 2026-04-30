import api from "@/Configs/Api.tsx";

interface getUserAverageRatingAndReviewsCountResponse {
    email: string;
}
export default async function getUserAverageRatingAndReviewsCount({email}:getUserAverageRatingAndReviewsCountResponse){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (baseUrl === "test") {
        return {
            averageRating: 4.5,
            reviewsCount: 10
        }
    }
    const data = await api.get(`/api/user/reviews/AverageRatingAndReviewsCount/${email}`);
    return data.data;
}