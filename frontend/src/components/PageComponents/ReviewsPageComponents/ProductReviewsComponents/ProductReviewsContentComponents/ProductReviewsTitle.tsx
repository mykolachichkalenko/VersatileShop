import {StarRating} from "@/components/AdditionalComponents/FormComponents/OtherContainers/StarRating.tsx";

interface ProductReviewsTitleProps {
    averageRating: number;
    reviewsCount: number;
}
export default function ProductReviewsTitle({averageRating, reviewsCount}: ProductReviewsTitleProps) {

    return(
        <div className={"mt-[10px]"}>
            <StarRating value={averageRating} size={30} count={reviewsCount} onlyStars={false}/>
        </div>
    )
}