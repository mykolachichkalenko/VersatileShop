import ProductReviewsTitle
    from "@/components/PageComponents/ReviewsPageComponents/ProductReviewsComponents/ProductReviewsContentComponents/ProductReviewsTitle.tsx";
import ProductReviewsReviews
    from "@/components/PageComponents/ReviewsPageComponents/ProductReviewsComponents/ProductReviewsContentComponents/ProductReviewsReviews.tsx";
import type Review from "@/Utils/Interfaces/Review.ts";
import ProductReviewsAddMyReview
    from "@/components/PageComponents/ReviewsPageComponents/ProductReviewsComponents/ProductReviewsContentComponents/ProductReviewsAddMyReview.tsx";
import React from "react";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

interface ProductReviewsContentProps {
    reviews: Review[],
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>,
    myEmail: string,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setMyReviewExists: React.Dispatch<React.SetStateAction<boolean>>,
    myReviewExists: boolean,
    averageRating: number;
    count: number;
    productId: number;
}

export default function ProductReviewsContent({
                                                  reviews,
                                                  myEmail,
                                                  setPage,
                                                  setMyReviewExists,
                                                  myReviewExists,
                                                  averageRating,
                                                  count,
                                                  productId,
                                                  setReviews
                                              }: ProductReviewsContentProps) {

    return (
        <div className={"w-full flex flex-col items-center"}>
            <ProductReviewsTitle averageRating={averageRating} reviewsCount={count}/>
            {reviews.length > 0 ?
                <ProductReviewsReviews reviews={reviews} myEmail={myEmail} setPage={setPage}
                                       setMyReviewExists={setMyReviewExists} productID={productId} setReviews={setReviews}/>
                :
                <div className={"h-[60vh] flex items-center justify-center"}>
                    <PWithPlaypenSans
                        className={"text-gray-500 text-2xl"}>{getLanguage("review.product.notFound")}</PWithPlaypenSans>
                </div>
            }
            {!myReviewExists &&
                <ProductReviewsAddMyReview setMyReviewExists={setMyReviewExists} productId={productId} setReviews={setReviews}/>
            }
        </div>
    );
}