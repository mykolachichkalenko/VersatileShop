import getTestUserChatInfo from "@/Utils/Functions/TestFunction/getTestUserChatInfo.ts";
import api from "@/Configs/Api.tsx";

interface getUserChatInfoResponse {
    userEmail:string;
}
export default async function getUserChatInfo({userEmail}:getUserChatInfoResponse) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if(baseUrl === "test" || baseUrl === userEmail){
        return getTestUserChatInfo();
    }

    const res = await api.post("/api/user/getChatUserInfo",{userEmail});
    return res.data;
}
