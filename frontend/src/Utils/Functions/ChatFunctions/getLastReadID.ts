import api from "@/Configs/Api.tsx";

interface getLastReadIDResponse {
    myId: number;
    userId: number;
}

export default async function getLastReadID({myId, userId}: getLastReadIDResponse) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") {
        return 0;
    }

    const res = await api.post("/api/messenger/getLastReadID", {myId, userId});
    return res.data;
}
