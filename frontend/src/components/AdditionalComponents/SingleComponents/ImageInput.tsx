import type {ChangeEvent} from "react";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import isImageValid from "@/Utils/Functions/ValidFunctions/isImageValid.ts";

interface ImageInputProps {
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
}
export default function ImageInput({setFile}: ImageInputProps) {


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!isImageValid(file)) {
            alert(getLanguage("myProfile.allowedFormats"));
            return;
        }
        setFile(file);
    }




    return (
        <div className="flex flex-col gap-2">
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleChange}
            />

            <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 rounded-xl border border-dashed border-slate-300 cursor-pointer bg-slate-50 hover:bg-slate-100 text-sm font-medium gap-2"
            >
                📁 <PWithPlaypenSans>{getLanguage("myProfile.selectPhoto")}</PWithPlaypenSans>
            </label>

        </div>
    );
}
