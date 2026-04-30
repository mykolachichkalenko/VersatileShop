import { StarRating } from "@/components/AdditionalComponents/FormComponents/OtherContainers/StarRating";

interface UserReviewsContentTitleProps {
    averageRating: number;
    reviewsCount: number;
}

export default function UserReviewsContentTitle({averageRating, reviewsCount}: UserReviewsContentTitleProps) {
    return (
        <div>

            <StarRating value={averageRating} size={30} count={reviewsCount} onlyStars={false}/>
        </div>
    );
}