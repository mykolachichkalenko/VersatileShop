import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {motion} from "framer-motion";
import {Label} from "@/components/ui/label.tsx";

interface ConditionComponentProps {
    condition: string;
    setCondition: (condition: string) => void;
}
export default function ConditionComponent({condition, setCondition}: ConditionComponentProps) {


    return (
        <div className={"searchPageFiltersContentCondition"}>
            <PWithPlaypenSans
                className={"searchPageFiltersContentConditionTitle"}>{getLanguage("searchPage.condition")}</PWithPlaypenSans>

            <RadioGroup className="mt-1 flex flex-wrap gap-x-6 gap-y-3"
            defaultValue={condition}
            onValueChange={(v) => setCondition(v)}>
                <motion.div
                    className="flex items-center gap-2">
                    <RadioGroupItem id="cond-all" value="all" className="h-5 w-5 border-gray-300 cursor-pointer"/>
                    <Label htmlFor="cond-all" className="cursor-pointer select-none text-sm text-gray-700">
                        {getLanguage("searchPage.all")}
                    </Label>
                </motion.div>

                <motion.div className="flex items-center gap-2">
                    <RadioGroupItem id="cond-used" value="used" className="h-5 w-5 border-gray-300 cursor-pointer"/>
                    <Label htmlFor="cond-used" className="cursor-pointer select-none text-sm text-gray-700">
                        {getLanguage("searchPage.used")}
                    </Label>
                </motion.div>

                <motion.div className="flex items-center gap-2">
                    <RadioGroupItem id="cond-new" value="new" className="h-5 w-5 border-gray-300 cursor-pointer"/>
                    <Label htmlFor="cond-new" className="cursor-pointer select-none text-sm text-gray-700">
                        {getLanguage("searchPage.new")}
                    </Label>
                </motion.div>
            </RadioGroup>


        </div>
    );
}
