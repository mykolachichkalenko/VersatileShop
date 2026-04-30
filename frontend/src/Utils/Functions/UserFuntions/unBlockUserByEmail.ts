import api from "@/Configs/Api.tsx";

interface unBlockUserByEmailProps {
    email: string;
}
export default async function unBlockUserByEmail({email}:unBlockUserByEmailProps){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if(baseUrl === "test") return true;

    const res = await api.post("/api/user/unblockUser",{email});
    return res.data;
}