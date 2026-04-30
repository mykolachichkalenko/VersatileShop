import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {GetStarRating} from "@/components/AdditionalComponents/SingleComponents/GetStarRating.tsx";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Send} from "lucide-react";
import "./ProductReviewsAddMyReview.css";
import createProductReview from "@/Utils/Functions/ReviewsFunctions/createProductReview.ts";
import type Review from "@/Utils/Interfaces/Review.ts";

interface ProductReviewsAddMyReviewProps {
    setMyReviewExists: React.Dispatch<React.SetStateAction<boolean>>,
    productId: number;
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export default function ProductReviewsAddMyReview({setMyReviewExists,productId,setReviews}: ProductReviewsAddMyReviewProps) {
    const [ratingStars, setRatingStars] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (ratingStars !== 0 && reviewText.length > 1 && reviewText.length < 2000) {
            setIsSubmitting(true);
        } else {
            setIsSubmitting(false);
        }
    }, [ratingStars, reviewText]);

    const submitReview = async () => {
        if (!isSubmitting) return;
        setMyReviewExists(true);
        const newReview = await createProductReview({ratingStars, reviewText, productId});
        setReviews(prev => [newReview, ...prev]);
   }

    return (
        <div className={"w-full mt-[10px] flex flex-col items-center"}>
            <div
                className={"productReviewsAddMyReviewContainer"}>
                <PWithPlaypenSans
                    className={"text-xl font-semibold"}>{getLanguage("review.product.leaveReview")}</PWithPlaypenSans>

                <div className={"flex flex-col "}>
                    <div>
                        <GetStarRating setRatingStars={setRatingStars}/>
                    </div>

                    <div className={"productReviewsAddMyReviewInputContainer"}>
                        <Input
                            className={"bg-transparent"}
                            onChange={(e) => setReviewText(e.target.value)}/>
                        <Send className={`cursor-pointer ${isSubmitting && "text-blue-700"}`} onClick={submitReview}/>
                    </div>
                </div>
            </div>
        </div>
    );
}