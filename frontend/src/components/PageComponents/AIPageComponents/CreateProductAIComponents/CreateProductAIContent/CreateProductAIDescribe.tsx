import {Textarea} from "@/components/ui/textarea.tsx";
import "./CreateProductAIDescribe.css";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Wand2} from "lucide-react";
import {useEffect, useState} from "react";
import api from "@/Configs/Api.tsx";
import TextTypeEffect from "@/components/AdditionalComponents/SingleComponents/TextTypeEffect.tsx";

export default function CreateProductAIDescribe() {
    const [isCorrect, setIsCorrect] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (prompt.trim().length > 50) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }, [prompt]);

    const createProduct = () => {
        if (isCorrect) {
            api.post("/api/ai/create/product", {description: prompt});
            setIsLoading(true);
            setPrompt("");
        }
    }
    return (
        <div className={"productDescriptionForAIContainer"}>
            {isLoading ?
                <div className={"w-full flex items-center justify-center flex-col gap-2"}>
                    <TextTypeEffect text={getLanguage("aiCreateProduct.generatingText")}
                                    className={"text-gray-500 text-center mt-[20px]"}/>
                    <PWithPlaypenSans
                        className={"text-xl text-gray-500"}>{getLanguage("aiCreateProduct.seeProduct")}</PWithPlaypenSans>
                    <p className={"text-blue-500 cursor-pointer"}
                       onClick={() => window.location.href = "/my-products"}>{getLanguage("aiCreateProduct.view")}</p>
                </div>
                :
                <>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className={"w-2 h-[30px] rounded-full bg-gray-400 cursor-pointer mb-2 ml-2"}>i</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PWithPlaypenSans
                                className={"text-gray-500"}>{getLanguage("aiCreateProduct.descriptionPart1")}</PWithPlaypenSans>
                            <PWithPlaypenSans
                                className={"text-gray-600 mt-2"}>{getLanguage("aiCreateProduct.descriptionPart2")}</PWithPlaypenSans>
                            <PWithPlaypenSans
                                className={"text-gray-500 mt-2"}> {getLanguage("aiCreateProduct.descriptionPart3")}</PWithPlaypenSans>
                        </PopoverContent>
                    </Popover>

                    <Textarea defaultValue={prompt} onChange={(e) => setPrompt(e.target.value)}
                              className={"productDescriptionForAI"}
                              placeholder={getLanguage("aiCreateProduct.placeholder")}/>

                    <div className={"w-full flex items-center justify-center mt-[20px]"}>

                        <button
                            className={"flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium cursor-pointer " +
                                `${isCorrect ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gray-500"} `}
                            onClick={createProduct}
                        >

                            {getLanguage("aiCreateProduct.generateButton")}
                            <Wand2 size={18}/>
                        </button>
                    </div>
                </>
            }
        </div>
    )
}
