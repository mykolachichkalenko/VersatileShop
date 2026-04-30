import getTestProducts from "@/Utils/Functions/TestFunction/getTestProducts.ts";
import api from "@/Configs/Api.tsx";

interface getMyProductsProps {
    page: number,
    lastProductId?:number
}

export default async function getMyProducts({page,lastProductId}: getMyProductsProps) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") return getTestProducts();

    const products = await api.post("/api/product/get/all", {page,lastProductId});
    return products.data;
}