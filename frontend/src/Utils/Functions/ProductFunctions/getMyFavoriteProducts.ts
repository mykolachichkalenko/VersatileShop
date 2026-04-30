import getTestMyFavoriteProducts from "@/Utils/Functions/TestFunction/getTestMyFavoriteProducts.ts";
import api from "@/Configs/Api.tsx";

interface getMyFavoriteProductsProps{
    page:number,
    minID:number,
}
export default async function getMyFavoriteProducts({page,minID}:getMyFavoriteProductsProps){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if(baseUrl === "test"){
        return getTestMyFavoriteProducts().map((p) => ({
            ...p,
            id: p.id + (page * 30),
        }));
    }

    const products = await api.get(`/api/product/get/favorites/${minID}`);
    return products.data;
}