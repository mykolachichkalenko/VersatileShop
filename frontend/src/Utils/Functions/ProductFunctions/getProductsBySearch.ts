import getTestProducts from "@/Utils/Functions/TestFunction/getTestProducts.ts";
import type SearchFilters from "@/Utils/Interfaces/SearchFilters.ts";
import api from "@/Configs/Api.tsx";
import type Product from "@/Utils/Interfaces/Product.ts";

interface getProductsBySearchProps {
    filters: SearchFilters,
    searchText: string,
    excludedIds: number[],
    page: number,
}

export default async function getProductsBySearch({filters, searchText, excludedIds, page}: getProductsBySearchProps):Promise<Product[]> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    if (baseUrl === "test") {
        const array = getTestProducts();
        return array.map(product => {
            return {...product, id: product.id + (page * 30)};
        });
    }

    const products = await api.post("api/product/get/bySearch", {
        excludedIds: excludedIds,
        filters: filters,
        searchText: searchText,
    });
    return products.data;
}