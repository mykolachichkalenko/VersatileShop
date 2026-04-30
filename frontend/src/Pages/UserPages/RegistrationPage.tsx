import DefaultComponent from "@/components/AdditionalComponents/DefaultComponents/DefaultComponent.tsx";
import {useEffect} from "react";
import api from "@/Configs/Api.tsx";

export default function RegistrationPage() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const isAuthenticated = async () => {
        const data = await api.get("/api/security/authenticated");
        if (data.data === false) {
            window.location.href = `${baseUrl}/oauth2/authorization/google`;
        } else {
            const data = await api.post("/api/create/my-profile");
            console.log(data.data);
            window.location.href = "/";
        }
    }

    useEffect(() => {
        isAuthenticated();
    }, []);

    return (
        <DefaultComponent>
            <></>
        </DefaultComponent>
    )
}