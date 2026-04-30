import type Product from "@/Utils/Interfaces/Product.ts";
import getTestProducts from "@/Utils/Functions/TestFunction/getTestProducts.ts";
import api from "@/Configs/Api.tsx";

interface getMyRecommendedProductsProps {
    page: number,
    lastProductID: number,
    allIDs?: number[],
    setIsDefaultFindingAndOffset: (value: string, offsetValue: number) => void,
    isDefaultFinding?: string,
    offset?: number,
}

export default async function getMyRecommendedProducts({
                                                           page,
                                                           lastProductID,
                                                           allIDs,
                                                           setIsDefaultFindingAndOffset,
                                                           isDefaultFinding,
                                                           offset
                                                       }: getMyRecommendedProductsProps): Promise<Product[]> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (baseUrl === "test") {
        const temporaryProducts = getTestProducts();

        return temporaryProducts.map(p => ({
            ...p,
            id: p.id + (page * 30),
        }));
    }

    const changedAllIDs = isDefaultFinding === "liked" ? allIDs : [];

    const res = await api.post("/api/recommended-product/get", {
        lastProductID: String(lastProductID),
        allIDs: changedAllIDs,
        page: String(page),
        isDefaultFinding: isDefaultFinding,
        offset: offset,
    });

    setIsDefaultFindingAndOffset(res.data.isDefaultFinding,res.data.offset);
    return res.data.products;
}