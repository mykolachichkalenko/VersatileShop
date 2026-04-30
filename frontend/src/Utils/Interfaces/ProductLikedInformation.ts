export default interface ProductLikedInformation {
    id:number,
    ownerEmail:string,
    ownerName?:string,
    ownerProfilePhoto?:string,
    title:string,
    description?:string,
    price:number,
    condition?:string,
    status?:string,
    photoFirst:string,
    photoSecond?:string,
    photoThird?:string,
    createdAt:string,
    liked:boolean,
    myEmail?:string,
    ownerStatus?:string
}