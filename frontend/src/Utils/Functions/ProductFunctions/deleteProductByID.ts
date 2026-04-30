import api from "@/Configs/Api.tsx";
import setCookie from "@/Utils/Functions/CookieFunctions/setCookie.ts";

interface deleteProductByIDProps {
    id: number,
}

export default async function deleteProductByID({id}: deleteProductByIDProps) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") return;

    const status = await api.post(`/api/product/delete/${id}`);
    setCookie("status", status.data);
}