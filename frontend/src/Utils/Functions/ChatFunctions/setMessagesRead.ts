import api from "@/Configs/Api.tsx";

interface setMessagesReadResponse {
    myId: number;
    userId: number;
}

export default function setMessagesRead({myId, userId}: setMessagesReadResponse) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") {
        return;
    }

    api.post("/api/messenger/setMessagesRead", {myId, userId});
}