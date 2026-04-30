import api from "@/Configs/Api.tsx";

interface getIsMyProductReviewExistsProps {
    productId: number;
}

export default async function getIsMyProductReviewExists({productId}:getIsMyProductReviewExistsProps) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "text") return false;

    const response = await api.get(`/api/product/reviews/my-review-exists/${productId}`);
    return response.data;
}