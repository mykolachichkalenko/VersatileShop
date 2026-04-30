import type EditProductRequest from "@/Utils/Interfaces/EditProductRequest.ts";

interface editProductProps{
    editedProduct:EditProductRequest
}
export default async function editProduct({editedProduct}:editProductProps){
    if (!('serviceWorker' in navigator)) return false;

    const registration = await navigator.serviceWorker.ready;
    const payload = editedProduct;

    if (registration.active) {
        registration.active.postMessage({
            type: "EDIT_PRODUCT",
            payload
        });
        return true;
    }

    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: "EDIT_PRODUCT",
            payload
        });
        return true;
    }

    console.warn('Немає активного service worker');
    return false;
}