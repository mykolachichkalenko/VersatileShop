import "./ProductReviewsReviews.css";
import type Review from "@/Utils/Interfaces/Review.ts";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {StarRating} from "@/components/AdditionalComponents/FormComponents/OtherContainers/StarRating.tsx";
import {Trash2Icon} from "lucide-react";
import React, {useEffect, useRef} from "react";
import deleteProductReviewByID from "@/Utils/Functions/ReviewsFunctions/deleteProductReviewByID.ts";
import getFormatedTime from "@/Utils/Functions/OtherUtilsFunctions/getFormatedTime.ts";

interface ProductReviewsReviewsProps {
    reviews: Review[],
    myEmail: string,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    setMyReviewExists: React.Dispatch<React.SetStateAction<boolean>>,
    productID: number;
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export default function ProductReviewsReviews({reviews, myEmail,setPage,setMyReviewExists,productID,setReviews}: ProductReviewsReviewsProps) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const lockRef = useRef(false);

    useEffect(() => {
        lockRef.current = false;
    }, [reviews?.length]);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !lockRef.current) {
                lockRef.current = true;
                setPage(prev => prev + 1);
            }
        });

        obs.observe(el);
        return () => obs.disconnect();
    }, [reviews?.length]);

    const deleteReview = async (id:number) => {
        const res = await deleteProductReviewByID({productId: productID});
        if(res === true){
        setMyReviewExists(false);
        setReviews(prev => prev.filter(r => r.id !== id));
        }
    }

    return (
        <div className={`mt-[50px] w-full h-full flex flex-col items-center`}>
            <div className={"productReviewsReviews"}>
                {reviews.map(r => (
                    <div key={r.id}>
                        <div
                            className={`inline-block ${myEmail === r.ownerEmail ? "bg-blue-300" : "bg-white"} rounded-2xl border border-gray-200/70 px-4 py-3`}>

                            <div className={"flex flex-row items-center gap-2"}>
                                <Avatar>
                                    <AvatarImage
                                        src={r.ownerAvatarUrl}
                                        alt="A"
                                    />
                                </Avatar>

                                <div className={"productReviewsOwnerNameContainer"}>
                                    <p className={"text-[15px] font-bold wrap-break-word"}>{r.ownerName}</p>
                                </div>

                                <p className={"ml-auto text-gray-400"}>{getFormatedTime({time:r.createdAt})}</p>
                            </div>

                            <div className={"w-full flex"}>
                                <StarRating value={r.rating} onlyStars={true}/>
                            </div>

                            <div>
                                <p className={"text-gray-500 font-[400]"}>{r.comment}</p>
                            </div>
                            {r.ownerEmail === myEmail &&
                                <div className={"w-full ml-auto flex justify-end"}>
                                    <Trash2Icon className={"text-red-600 cursor-pointer"}
                                                onClick={() => deleteReview(r.id)}/>
                                </div>}
                        </div>
                    </div>
                ))}
                <div ref={sentinelRef} style={{height: 1}}/>
            </div>
        </div>
    );
}