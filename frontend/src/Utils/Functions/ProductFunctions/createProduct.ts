import type CreateProductRequest from "@/Utils/Interfaces/CreateProductRequest.ts";
import correctProductToCreate from "@/Utils/Functions/ProductFunctions/correctProductToCreate.ts";

export default async function createProduct(product: CreateProductRequest) {
    if (!('serviceWorker' in navigator)) return false;

    const registration = await navigator.serviceWorker.ready;
    const payload = correctProductToCreate(product);

    if (registration.active) {
        registration.active.postMessage({
            type: "CREATE_PRODUCT",
            payload
        });
        return true;
    }

    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: "CREATE_PRODUCT",
            payload
        });
        return true;
    }

    console.warn('Немає активного service worker');
    return false;
}