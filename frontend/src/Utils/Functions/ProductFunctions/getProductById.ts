import getTestProduct from "@/Utils/Functions/TestFunction/getTestProduct.ts";
import api from "@/Configs/Api.tsx";

interface getProductByIdProps {
    id: number
}

export default async function getProductById({id}: getProductByIdProps) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") return getTestProduct();

    const res = await api.get(`api/product/get/${id}`);

    if(res.data.id === -1){
        return null;
    }
    console.log(res.data);
    return res.data;
}
