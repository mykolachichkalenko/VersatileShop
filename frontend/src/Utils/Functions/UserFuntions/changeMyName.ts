import api from "@/Configs/Api.tsx";

export default function changeMyName(name: string) {
    return api.post("/api/change-name", {name: name});
}