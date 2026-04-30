import getTestChats from "@/Utils/Functions/TestFunction/getTestChats.ts";
import api from "@/Configs/Api.tsx";

export default async function getChats(){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test"){
        return getTestChats();
    }

    const res = await api.get("api/messenger/get/chats");
    return res.data;
}