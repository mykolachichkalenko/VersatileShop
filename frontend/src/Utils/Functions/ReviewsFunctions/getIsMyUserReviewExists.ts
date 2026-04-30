import api from "@/Configs/Api.tsx";

interface getIsMyUserReviewExistsResponse {
    userEmail: string;
}

export default async function getIsMyUserReviewExists({userEmail}: getIsMyUserReviewExistsResponse) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (baseUrl === "test") {
        return true;
    }
    const data = await api.post("/api/user/reviews/isMyReviewExists", {userEmail});
    return data.data;
}