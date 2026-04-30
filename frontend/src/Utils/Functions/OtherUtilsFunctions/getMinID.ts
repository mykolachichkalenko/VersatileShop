import type Product from "@/Utils/Interfaces/Product.ts";

interface getMinIDProps{
    products: Product[] | null | undefined;
}

export default function getMinID({ products }: getMinIDProps): number {
    const minId = products ? products.reduce((min, p) => Math.min(min, p.id), Infinity) : Infinity;
    return Number.isFinite(minId) ? minId : 0;
}
