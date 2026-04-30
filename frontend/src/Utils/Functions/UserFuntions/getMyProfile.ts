import api from "@/Configs/Api.tsx";
import getTestUserData from "@/Utils/Functions/TestFunction/getTestUserData.ts";
import type UserProfile from "@/Utils/Interfaces/UserProfile.ts";

export const getMyProfile = async (): Promise<UserProfile> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") {
        return getTestUserData();
    }

    try {
        const data = await api.get("/api/get/my-profile");
        if (data.data.email === null || data.data.email === "" || !data.data.email) window.location.href = `${baseUrl}/oauth2/authorization/google`;
        return data.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) window.location.href = `${baseUrl}/oauth2/authorization/google`;
        throw new Error("Failed to fetch profile data");
    }
}