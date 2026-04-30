import {useEffect, useState} from "react";
import ProductReviewsHeader
    from "@/components/PageComponents/ReviewsPageComponents/ProductReviewsComponents/ProductReviewsHeader.tsx";
import ProductReviewsContent
    from "@/components/PageComponents/ReviewsPageComponents/ProductReviewsComponents/ProductReviewsContent.tsx";
import type Review from "@/Utils/Interfaces/Review.ts";
import type AverageRatingAndReviewsCount from "@/Utils/Interfaces/AverageRatingAndReviewsCount.ts";
import getProductReviews from "@/Utils/Functions/ReviewsFunctions/getProductReviews.ts";
import getIsMyProductReviewExists from "@/Utils/Functions/ReviewsFunctions/getIsMyProductReviewExists.ts";
import getProductAverageRatingAndReviewsCount
    from "@/Utils/Functions/ReviewsFunctions/getProductAverageRatingAndReviewsCount.ts";
import getMyEmail from "@/Utils/Functions/UserFuntions/getMyEmail.ts";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";

interface ProductReviewsContainerProps {
    productId: number;
}

export default function ProductReviewsContainer({productId}: ProductReviewsContainerProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [myReviewExists, setMyReviewExists] = useState<boolean>(false);
    const [myEmail, setMyEmail] = useState<string>("");
    const [averageRatingAndReviewsCount, setAverageRatingAndReviewsCount] = useState<AverageRatingAndReviewsCount>();
    const [page, setPage] = useState<number>(0);
    const [isSettled, setIsSettled] = useState<boolean>(false);

    useEffect(() => {
        if (productId === 0) {
            window.location.href = "/";
        }
        (async () => {
            await setData();
        })();
    }, [productId]);

    const setData = async () => {
        const reviewsResponse = await getProductReviews({productId, page, minId: 0});
        const myReviewExistsResponse = await getIsMyProductReviewExists({productId});
        const averageRatingAndReviewsCountResponse = await getProductAverageRatingAndReviewsCount({productId});

        setReviews([...reviewsResponse || []]);
        setMyReviewExists(myReviewExistsResponse || false);
        setAverageRatingAndReviewsCount(averageRatingAndReviewsCountResponse || undefined);

        const email = await getMyEmail();
        if (email.length === 0) {
            setMyEmail("null");
        } else {
            setMyEmail(email);
        }
    }

    useEffect(() => {
        if (myEmail.length > 0) {
            setIsSettled(true);
        } else {
            setIsSettled(false);
        }
    }, [myEmail]);

    useEffect(() => {
        if (page !== 0) {
            (async () => {
                const minId = reviews ? reviews.reduce((min, p) => Math.min(min, p.id), Infinity) : Infinity;
                const finalMinId = Number.isFinite(minId) ? minId : 0;

                const newReviews = await getProductReviews({productId, page, minId: finalMinId});
                setReviews(prev => [...prev, ...newReviews]);
            })();
        }
    }, [page]);

    return (
        <div>
            <ProductReviewsHeader/>
            {isSettled ?
                <ProductReviewsContent reviews={reviews} myEmail={myEmail} setPage={setPage}
                                       setMyReviewExists={setMyReviewExists} myReviewExists={myReviewExists}
                                       averageRating={averageRatingAndReviewsCount?.averageRating || 0}
                                       count={averageRatingAndReviewsCount?.reviewsCount || 0}
                                       productId={productId} setReviews={setReviews}
                />
                :
                <div className={"w-full h-[80vh] flex items-center justify-center"}>
                    <PageLoader/>
                </div>
            }
        </div>
    );
}
