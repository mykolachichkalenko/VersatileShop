import api from "@/Configs/Api.tsx";

interface blockUserByEmailProps {
    email: string;
}
export default async function blockUserByEmail({email}:blockUserByEmailProps){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if(baseUrl === "test") return true;

    const res = await api.post("/api/user/blockUser",{email});
    return res.data;
}