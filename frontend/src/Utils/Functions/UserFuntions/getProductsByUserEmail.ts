import getTestProducts from "@/Utils/Functions/TestFunction/getTestProducts.ts";
import api from "@/Configs/Api.tsx";

interface getProductsAndProductCountOfUserProps {
    email?: string;
    minId: number;
}
export default async function getProductsByUserEmail({email,minId}: getProductsAndProductCountOfUserProps) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (baseUrl === "test"){
        if(minId !== 0) return;
        return getTestProducts();
    }

    const data = await api.post("/api/user/getUserProducts",{email,minId});
    return data.data;
}