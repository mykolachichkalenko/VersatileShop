import api from "@/Configs/Api.tsx";

interface getIsUserBlockedProps {
    email: string;
}
export default async function getIsUserBlocked({email}:getIsUserBlockedProps){
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    if (baseURL === "test"){
        return true;
    }

    const res = await api.post("/api/user/isBlocked",{userEmail:email});
    return res.data
}
