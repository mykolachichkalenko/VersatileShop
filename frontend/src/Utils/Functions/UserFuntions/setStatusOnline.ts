import api from "@/Configs/Api.tsx";

export default function setStatusOnline(){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if(baseUrl === "test") return;

    api.post("/api/change-status");
}