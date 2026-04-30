import {useParams} from "react-router-dom";
import UserReviewsHeader
    from "@/components/PageComponents/ReviewsPageComponents/UserReviewsComponents/UserReviewsHeader.tsx";
import UserReviewsContent
    from "@/components/PageComponents/ReviewsPageComponents/UserReviewsComponents/UserReviewsContent.tsx";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import {useEffect, useState} from "react";
import type AverageRatingAndReviewsCount from "@/Utils/Interfaces/AverageRatingAndReviewsCount.ts";
import getUserAverageRatingAndReviewsCount
    from "@/Utils/Functions/ReviewsFunctions/getUserAverageRatingAndReviewsCount.ts";
import getMyEmail from "@/Utils/Functions/UserFuntions/getMyEmail.ts";
import getIsMyUserReviewExists from "@/Utils/Functions/ReviewsFunctions/getIsMyUserReviewExists.ts";
import type Review from "@/Utils/Interfaces/Review.ts";
import getUserReviews from "@/Utils/Functions/ReviewsFunctions/getUserReviews.ts";

export default function UserReviewsContainer() {
    const {email} = useParams();

    const [averageRatingAndReviewsCount, setAverageRatingAndReviewsCount] = useState<AverageRatingAndReviewsCount | null>(null);
    const [myEmail, setMyEmail] = useState<string>();
    const [isThereMyReview, setIsThereMyReview] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState<number>(0);

    const setData = async () => {
        if (!email) return;
        const getEmail = await getMyEmail();
        const isMyReviewExists = await getIsMyUserReviewExists({userEmail: email});
        const userReviews = await getUserReviews({email, minId: 0, page});
        const averageRatingAndReviewsCount = await getUserAverageRatingAndReviewsCount({email});

        setMyEmail(getEmail);
        setIsThereMyReview(isMyReviewExists);
        setReviews(userReviews);
        setAverageRatingAndReviewsCount(averageRatingAndReviewsCount);
    }

    useEffect(() => {
        if (!email) return;
        setData();
    }, [email]);

    useEffect(() => {
        if (page === 0 || !email) return;
        (async () => {
            const minId = reviews ? reviews.reduce((min, p) => Math.min(min, p.id), Infinity) : Infinity;
            const finalMinId = Number.isFinite(minId) ? minId : 0;

            const newReviews = await getUserReviews({page, email, minId: finalMinId});
            setReviews(prev => [...prev, ...newReviews]);
        })();
    }, [page]);

    return (
        <div className={"w-full flex justify-center flex-col items-center gap-4"}>
            <UserReviewsHeader/>
            {(email && email.length > 0 && averageRatingAndReviewsCount !== null)
                ?
                <UserReviewsContent reviewsCount={averageRatingAndReviewsCount.reviewsCount || 0}
                                    averageRating={averageRatingAndReviewsCount.averageRating || 0}
                                    myEmail={myEmail} isThereMyReview={isThereMyReview} reviews={reviews}
                                    setPage={setPage} setMyReviewExists={setIsThereMyReview} setReviews={setReviews}
                                    userEmail={email}
                />
                :
                <div className={"w-full h-[70vh] flex items-center justify-center"}>
                    <PageLoader/>
                </div>
            }
        </div>
    )
}