import api from "@/Configs/Api.tsx";

interface deleteReviewProps {
    productId: number;
}
export default async function deleteProductReviewByID({productId}:deleteReviewProps){
    const result = await api.post("/api/product/review/delete", {productId});
    return result.data;
}