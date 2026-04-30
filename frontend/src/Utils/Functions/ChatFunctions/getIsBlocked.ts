import api from "@/Configs/Api.tsx";

interface getIsBlockedProps {
    userEmail: string;
}
export default async function getIsBlocked({userEmail}:getIsBlockedProps){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if(baseUrl === "test") {
        return{
            isUserBlocked: false,
            isMeBlocked: false,
        }
    }

    const res = await api.post("/api/messenger/getIsBlocked", {userEmail});
    return res.data;
}