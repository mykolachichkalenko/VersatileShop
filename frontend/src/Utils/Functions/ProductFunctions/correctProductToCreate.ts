import type CreateProductRequest from "@/Utils/Interfaces/CreateProductRequest.ts";

export default function correctProductToCreate(product:CreateProductRequest){
    let correctedProduct = product;

    if(!product.photoThird){
        return correctedProduct;
    }
    if(product.photoThird && !product.photoSecond){
        correctedProduct.photoSecond = product.photoThird;
        correctedProduct.photoThird = undefined;
        return correctedProduct;
    }
    return correctedProduct;
}