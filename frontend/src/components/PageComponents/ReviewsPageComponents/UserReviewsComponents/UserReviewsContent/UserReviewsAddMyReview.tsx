import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {GetStarRating} from "@/components/AdditionalComponents/SingleComponents/GetStarRating.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Send} from "lucide-react";
import {useEffect, useState} from "react";
import type Review from "@/Utils/Interfaces/Review.ts";
import createUserReview from "@/Utils/Functions/ReviewsFunctions/createUserReview.ts";

interface UserReviewsAddMyReviewProps {
    setMyReviewExists: React.Dispatch<React.SetStateAction<boolean>>,
    userEmail: string,
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>,
}
export default function UserReviewsAddMyReview({setMyReviewExists, userEmail, setReviews}: UserReviewsAddMyReviewProps) {
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
        const newReview = await createUserReview({ratingStars,reviewText,userEmail});
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