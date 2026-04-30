import getTestProduct from "@/Utils/Functions/TestFunction/getTestProduct.ts";
import api from "@/Configs/Api.tsx";

interface getProductForEditProps {
    id: number
}
export default async function getProductForEdit({id}: getProductForEditProps) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") return getTestProduct();

    const res = await api.get(`api/product/get/forEdit/${id}`);

    if (res.data.id === -1) {
        return null;
    }
    return res.data;
}