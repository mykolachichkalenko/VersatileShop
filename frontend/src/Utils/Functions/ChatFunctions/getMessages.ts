import getTestMessages from "@/Utils/Functions/TestFunction/getTestMessages.ts";
import api from "@/Configs/Api.tsx";

interface getMessagesProps {
    page: number;
    myId: number;
    userId: number;
    minId: number;
}

export default async function getMessages({page, myId, userId, minId}: getMessagesProps) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") {
        return getTestMessages({page});
    }

    const res = await api.post("/api/messenger/getMessages", {myId, userId, minId});
    return res.data;
}