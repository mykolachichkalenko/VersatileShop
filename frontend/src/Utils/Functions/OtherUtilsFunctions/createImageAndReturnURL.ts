import api from "@/Configs/Api.tsx";

interface createImageAndReturnURLProps {
    fd: FormData;
}
export default async function createImageAndReturnURL({fd}:createImageAndReturnURLProps){

    const res = await api.post("api/file/createImage/andGetURL",fd,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })

    return res.data;
}