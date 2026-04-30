export default interface EditProductRequest{
    id:number | null | undefined,
    title?:string | null | undefined,
    description?: string | null | undefined,
    price?: number | null | undefined,
    condition?:string | null | undefined,
    photoFirst?: File | null | undefined,
    photoSecond?: File | null | undefined,
    photoThird?: File | null | undefined;
}