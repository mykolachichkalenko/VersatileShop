import api from "@/Configs/Api.tsx";

interface getUserIDByEmailProps {
    email: string;
}
export default async function getUserIDByEmail({email}:getUserIDByEmailProps){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if(baseUrl ==="test"){
        return 1;
    }
    const res = await api.post("/api/user/get/id/byEmail",{email});
    return res.data;
}
