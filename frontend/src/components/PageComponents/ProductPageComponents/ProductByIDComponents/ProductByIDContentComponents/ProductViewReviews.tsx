import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {Eye} from "lucide-react";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

interface ProductViewReviewsProps {
    productId: number
}
export default function ProductViewReviews({productId}: ProductViewReviewsProps) {

    const redirectToReviews = () => {
        window.location.href = "/product/reviews/" + productId;
    }
    return (
        <div className={"w-[96%] mt-[30px]"} onClick={redirectToReviews}>
            <PWithPlaypenSans
                className={"text-xl flex flex-row gap-1 items-center cursor-pointer text-gray-500 hover:text-gray-700"}>
                {getLanguage("productPage.viewReviews")}
                <Eye/>
            </PWithPlaypenSans>
        </div>
    );
}