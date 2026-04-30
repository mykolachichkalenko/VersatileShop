import api from "@/Configs/Api.tsx";

interface createReportUserProps {
    userEmail: string;
    reason: string;
}

export default async function createReportUser({userEmail,reason}:createReportUserProps) {
    await api.post("api/reports/user/create", {reportedUserEmail:userEmail, reason});
}