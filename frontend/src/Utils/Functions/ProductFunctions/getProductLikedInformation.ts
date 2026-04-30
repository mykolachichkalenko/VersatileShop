import getTestProductLikedInformation from "@/Utils/Functions/TestFunction/getTestProductLikedInformation.ts";
import api from "@/Configs/Api.tsx";

interface getProductLikedInformationProps {
    id: number
}

export default async function getProductLikedInformation({id}: getProductLikedInformationProps) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (baseUrl === "test") {
        return getTestProductLikedInformation();
    }
    const data = await api.get(`/api/product/get/liked/information/${id}`);
    if (data.data.id === -1) {
        return null;
    }
    return data.data;
}