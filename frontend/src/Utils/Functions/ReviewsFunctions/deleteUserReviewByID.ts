import api from "@/Configs/Api.tsx";

interface deleteUserReviewByIDProps {
    id:number;
    userEmail:string;
}

export default async function deleteUserReviewByID({id,userEmail}: deleteUserReviewByIDProps) {
    const data = await api.post("/api/user/review/delete", {reviewId:id,userEmail});
    return data.data;
}