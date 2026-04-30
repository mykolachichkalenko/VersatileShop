import api from "@/Configs/Api.tsx";

export default async function changeMyAvatar(file: File) {
    if(!file) {
        throw new Error("No file provided");
    }

    const formData = new FormData();
    formData.append("avatar", file);


    const response = await api.post("/api/change-avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}