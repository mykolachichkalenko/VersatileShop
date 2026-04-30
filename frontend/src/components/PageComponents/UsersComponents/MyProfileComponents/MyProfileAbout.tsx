import MyProfileAboutItem from "@/components/AdditionalComponents/Cards/MyProfileAboutCard.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {MapPin, Pencil} from "lucide-react";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import CustomIconBG from "@/components/AdditionalComponents/SingleComponents/CustomIconBG.tsx";
import DialogChangeDepartment
    from "@/components/AdditionalComponents/FormComponents/Dialogs/DialogChangeDepartment.tsx";
import {useEffect, useState} from "react";
import getUserAverageRatingAndReviewsCount
    from "@/Utils/Functions/ReviewsFunctions/getUserAverageRatingAndReviewsCount.ts";

interface MyProfileAboutProps {
    productsCount: string,
    favoritesCount: string,
    department: string,
    city: string,
    setDepartment: (department: string) => void,
    setCity: (city: string) => void,
    email?: string
}

export default function MyProfileAbout({
                                           productsCount,
                                           favoritesCount,
                                           department,
                                           city,
                                           setCity,
                                           setDepartment,
                                           email
                                       }: MyProfileAboutProps) {

    const [ratingText,setRatingText] = useState<string>();
    useEffect(() => {
        if(!email) return;

        (async () => {
            const rating = await getUserAverageRatingAndReviewsCount({email});
            setRatingText(String(rating.averageRating)+'(' + (rating.reviewsCount) + ')');
        })();
    }, [email]);
    return (
        <div className={"myProfileAboutContainer"}>
            <MyProfileAboutItem count={productsCount} type={"products"} text={getLanguage("myProfile.products")}/>

            <MyProfileAboutItem count={favoritesCount} type={"favorites"}
                                text={getLanguage("myProfile.favorites")}/>

            <div className={"myProfileAboutItem"}>
                <DialogChangeDepartment
                    department={department}
                    city={city}
                    setCity={setCity}
                    setDepartment={setDepartment}
                    trigger={
                        <button
                            type="button"
                            className="absolute top-1 right-1 flex items-center justify-center cursor-pointer w-7 h-7 rounded-full bg-white shadow-md border border-slate-200"
                        >
                            <Pencil className="w-3.5 h-3.5 text-slate-500"/>
                        </button>

                    }/>

                <CustomIconBG>
                    <MapPin className="w-5 h-5 text-blue-500"/>
                </CustomIconBG>

                <PWithPlaypenSans
                    className={"font-semibold text-xs leading-tight break-all"}>{
                    department && city ? (city) + "," + (department) : getLanguage("myProfile.department")}
                </PWithPlaypenSans>
            </div>

            <MyProfileAboutItem count={ratingText} type={"rating"} text={getLanguage("myProfile.rating")} email={email}/>

            <MyProfileAboutItem type={"sellers"} text={getLanguage("myProfile.search_sellers")}/>

            <MyProfileAboutItem type={"chat"} text={getLanguage("myProfile.chat")}/>
        </div>
    )
}
