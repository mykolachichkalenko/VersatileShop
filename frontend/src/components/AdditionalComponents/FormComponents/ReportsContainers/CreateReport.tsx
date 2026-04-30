import React, {useState} from "react";
import "./ProductReport.css";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";
import createReportProduct from "@/Utils/Functions/ReportFunctions/createReportProduct.ts";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import createReportUser from "@/Utils/Functions/ReportFunctions/createReportUser.ts";

interface ProductReportProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    productId?: number,
    userEmail?: string,
    type: string;
}

export default function CreateReport({isOpen, setIsOpen, productId, type, userEmail}: ProductReportProps) {
    const [reportText, setReportText] = useState<string>("");

    const createReport = async () => {
        if (type === "product" && productId) {
            await createReportProduct({reportText, productId});
        } else {
            if (userEmail) {
                await createReportUser({userEmail: userEmail, reason: reportText});
            }
        }


        setReportText("");
        setIsOpen(false);
    }

    return (
        <>
            {isOpen &&
                <div className={"productReportContainer"}>
                    <div className={"productReportContent"}>
                        <PWithPlaypenSans
                            className={"mb-5 text-xl font-semibold text-red-600"}>{getLanguage("reportComponent.title")}
                        </PWithPlaypenSans>

                        <Input className={"mb-5 w-[90%] bg-gray-200/60"}
                               placeholder={getLanguage("reportComponent.reason")}
                               value={reportText}
                               onChange={(event) => setReportText(event.target.value)}/>

                        {reportText.trim().length > 7 &&
                            <Button
                                className={"bg-gray-400/60 cursor-pointer hover:bg-gray-500 text-gray-200"}
                                onClick={() => createReport()}>
                                {getLanguage("reportComponent.send")}
                            </Button>
                        }
                        <div className={"absolute top-2 right-2 cursor-pointer"} onClick={() => setIsOpen(false)}>
                            <X/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}