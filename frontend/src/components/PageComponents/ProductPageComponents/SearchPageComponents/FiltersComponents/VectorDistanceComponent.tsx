import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {useEffect, useState} from "react";
import {Slider} from "@/components/ui/slider.tsx";

interface VectorDistanceComponentProps {
    vectorDistance: number;
    setVectorDistance: (distance: number) => void;
}
export default function VectorDistanceComponent({vectorDistance, setVectorDistance}: VectorDistanceComponentProps) {
    const [tempVectorDistance, setTempVectorDistance] = useState<number>(vectorDistance);
    const [description, setDescription] = useState<string>("vectorFindLowSimilarity");

    useEffect(() => {
        if (tempVectorDistance <= 0.4) {
            setDescription("vectorFindLowSimilarity")
        } else if (tempVectorDistance > 0.4 && tempVectorDistance <= 0.6) {
            setDescription("vectorFindMediumSimilarity")
        } else {
            setDescription("vectorFindHighSimilarity")
        }
    }, [tempVectorDistance]);

    const setVectorDistanceValidated = (distance: number) => {
        setTempVectorDistance(distance);

        const validatedDistance = Number((1 - distance).toFixed(2));
        setVectorDistance(validatedDistance);
    }

    return (
        <div className={"vectorDistanceComponentContainer"}>
            <PWithPlaypenSans
                className={"vectorDistanceComponentContainerTitle"}>{getLanguage("searchPage.vector")}</PWithPlaypenSans>
            <PWithPlaypenSans className={"text-xs"}>
                {getLanguage(`searchPage.${description}`)}
            </PWithPlaypenSans>

            <div className={"w-[200px]"}>
                <Slider
                    min={0.2}
                    max={0.8}
                    step={0.1}
                    value={[tempVectorDistance]}
                    className={"mt-3"}
                    onValueChange={(e) => setVectorDistanceValidated(Number(e))}/>
            </div>
        </div>
    )
}