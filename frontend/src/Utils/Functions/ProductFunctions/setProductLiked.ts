import api from "@/Configs/Api.tsx";
import deleteLikedProduct from "@/Utils/Functions/ProductFunctions/deleteLikedProduct.ts";

interface setProductLikedProps {
    id?: number,
    liked?: boolean,
    email?: string
}
export default async function setProductLiked({id,liked,email}:setProductLikedProps){

    if(liked === true){
        const data = await api.post("/api/product/set/liked",{email: email, productId: id, liked: liked});
        return data.data;
    }else{
        return await deleteLikedProduct({id, email});
    }
}