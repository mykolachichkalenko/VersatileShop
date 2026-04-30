export default interface Review {
    id: number;
    ownerName: string;
    ownerAvatarUrl: string;
    ownerEmail: string;
    rating: number;
    comment: string;
    createdAt: number[];
}