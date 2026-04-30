import api from "@/Configs/Api.tsx";

interface deleteLikedProductProps {
    id?: number,
    email?: string
}
export default async function deleteLikedProduct({id,email}:deleteLikedProductProps){
    const data = await api.post("api/product/delete/liked",{email: email, productId: id});
    return data.data;
}