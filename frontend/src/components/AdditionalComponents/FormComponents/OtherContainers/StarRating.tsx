import {Star} from "lucide-react";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

type RatingProps = {
    value: number;
    count?: number;
    size?: number;
    onlyStars?: boolean;
};

export function StarRating({value, count = 0, size = 18, onlyStars}: RatingProps) {
    const full = Math.floor(value);
    const hasHalf = value - full >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    return (
        <div className="flex flex-col items-center gap-1">
            {onlyStars === false &&
                <div className="text-6xl font-extrabold leading-none text-blue-700">{value.toFixed(1)}</div>}

            <div className="flex items-center gap-1">
                {Array.from({length: full}).map((_, i) => (
                    <Star key={`f-${i}`} size={size} className="fill-yellow-400 text-yellow-400"/>
                ))}

                {hasHalf && (
                    <span className="relative inline-flex">
            <Star size={size} className="text-yellow-400"/>
            <Star
                size={size}
                className="absolute left-0 top-0 fill-yellow-400 text-yellow-400"
                style={{clipPath: "inset(0 50% 0 0)"}}
            />
          </span>
                )}

                {Array.from({length: empty}).map((_, i) => (
                    <Star key={`e-${i}`} size={size} className="text-gray-300"/>
                ))}
            </div>

            {(count > 0 && onlyStars === false) && (
                <div className="text-xl text-gray-500">
                    {getLanguage("review.product.totalReviewsBased")} {count} {getLanguage("review.product.reviews")}
                </div>
            )}
        </div>
    );
}
