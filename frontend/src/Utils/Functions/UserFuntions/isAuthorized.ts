import api from "@/Configs/Api.tsx";

export default async function isAuthorized() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (baseUrl === "test") return true;

    const res = await api.get("/api/security/authenticated");
    return res.data;
}