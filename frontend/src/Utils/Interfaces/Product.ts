export default interface Product{
    id:number,
    ownerEmail:string,
    title:string,
    description?:string,
    price:number,
    condition?:string,
    status?:string,
    photoFirst:string,
    photoSecond?:string,
    photoThird?:string,
    createdAt:string
}