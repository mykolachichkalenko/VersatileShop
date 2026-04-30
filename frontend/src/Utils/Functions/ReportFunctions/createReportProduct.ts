import api from "@/Configs/Api.tsx";

interface createReportProductProps {
    productId: number,
    reportText: string,
}

export default async function createReportProduct({productId, reportText}: createReportProductProps) {
    await api.post("/api/reports/product/create", {productId, reason: reportText});
}