import getTestSellers from "@/Utils/Functions/TestFunction/getTestSellers.ts";
import api from "@/Configs/Api.tsx";

interface getSellersByEmailProps {
    email:string;
}
export default async function getSellersByEmail({email}:getSellersByEmailProps){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if(baseUrl === "test"){
        return getTestSellers();
    }

    const data = await api.post("/api/sellers/getByEmail", {email});
    return data.data;
}