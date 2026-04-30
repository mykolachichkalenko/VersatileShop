import { motion} from "framer-motion"
import {Alert} from "@/components/ui/alert.tsx";
import {AlertCircleIcon, CheckCircle2Icon} from "lucide-react";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import type Status from "@/Utils/Interfaces/Status.ts";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function StatusComponent({color,text}:Status) {
    return (
            <motion.div className={"absolute right-0 bottom-20 z-999"}
                        initial={{x: 300, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: 300, opacity: 0}}
                        transition={{duration: 0.35, ease: "easeOut"}}
            >
                {color === "green" ?
                <Alert className={"h-[72px] w-[310px] overflow-hidden break-all"}>
                    <CheckCircle2Icon/>
                    <PWithPlaypenSans className={"text-green-600 font-semibold"}>{getLanguage(text || "Not found")}</PWithPlaypenSans>
                </Alert>
                    :
                    <Alert variant={"destructive"} className={"h-[72px] w-[310px] overflow-hidden break-all"}>
                        <AlertCircleIcon />
                        <PWithPlaypenSans className={"text-red-600 font-semibold"}>{getLanguage(text || "Not found")}</PWithPlaypenSans>
                    </Alert>
                }
            </motion.div>
    );
}