import getTestUserInfo from "@/Utils/Functions/TestFunction/getTestUserInfo.ts";
import api from "@/Configs/Api.tsx";

interface getUserBioInfoProps {
    email?: string;
}
export default async function getUserBioInfo({email}: getUserBioInfoProps) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if(baseUrl==="test"){
        return getTestUserInfo();
    }
    const data = await api.post("/api/user/getUserInfo",{email});
    return data.data;
}