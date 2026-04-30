import api from "@/Configs/Api.tsx";

export default async function getProductsCount() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") {
        return 10;
    }
    const res = await api.get("/api/product/count");
    return res.data;
}