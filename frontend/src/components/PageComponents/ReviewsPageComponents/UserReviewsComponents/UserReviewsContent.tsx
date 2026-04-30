import UserReviewsContentTitle
    from "@/components/PageComponents/ReviewsPageComponents/UserReviewsComponents/UserReviewsContent/UserReviewsContentTitle.tsx";
import UserReviewsContentReviews
    from "@/components/PageComponents/ReviewsPageComponents/UserReviewsComponents/UserReviewsContent/UserReviewsContentReviews.tsx";
import type Review from "@/Utils/Interfaces/Review.ts";
import UserReviewsAddMyReview
    from "@/components/PageComponents/ReviewsPageComponents/UserReviewsComponents/UserReviewsContent/UserReviewsAddMyReview.tsx";

interface UserReviewsContentProps {
    averageRating: number;
    reviewsCount: number;
    myEmail?: string;
    isThereMyReview?: boolean;
    reviews: Review[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    userEmail: string;
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
    setMyReviewExists: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserReviewsContent({
                                               averageRating,
                                               reviewsCount,
                                               myEmail,
                                               isThereMyReview,
                                               reviews,
                                               setPage,
                                               userEmail,
                                               setReviews,
                                               setMyReviewExists

                                           }: UserReviewsContentProps) {

    return (
        <div className={"flex flex-col"}>
            <UserReviewsContentTitle averageRating={averageRating} reviewsCount={reviewsCount}/>
            <UserReviewsContentReviews reviews={reviews} setPage={setPage} myEmail={myEmail} userEmail={userEmail}
                                       setMyReviewExists={setMyReviewExists} setReviews={setReviews}/>

            {!isThereMyReview &&
                <UserReviewsAddMyReview setReviews={setReviews} setMyReviewExists={setMyReviewExists}
                                        userEmail={userEmail}/>}
        </div>
    );
}