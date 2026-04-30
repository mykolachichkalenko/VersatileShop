import api from "@/Configs/Api.tsx";

interface getProductsCountByEmailProps {
    email?: string;
}
export default async function getProductsCountByEmail({email}:getProductsCountByEmailProps){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if(baseUrl==="test"){
        return 100;
    }

    const data = await api.get(`api/product/count/byEmail/${email}`);
    return Number(data.data);
}