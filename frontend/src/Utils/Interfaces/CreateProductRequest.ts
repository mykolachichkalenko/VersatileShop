export default interface CreateProductRequest{
    title:string,
    description: string;
    price: number;
    condition:string;
    photoFirst: File;
    photoSecond?: File;
    photoThird?: File;
}