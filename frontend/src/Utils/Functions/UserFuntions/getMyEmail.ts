import api from "@/Configs/Api.tsx";

export default async function getMyEmail() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if(baseUrl ==="test"){
        return "email@";
    }

    const data = await api.get("api/get/my/email");
    const email = data.data === "null" || !data.data ? "" : data.data;
    return email as string;
}