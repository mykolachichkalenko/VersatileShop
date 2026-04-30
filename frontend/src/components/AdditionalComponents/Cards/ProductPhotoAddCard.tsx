import {UploadIcon, X} from "lucide-react";
import "./ProductPhotoAddCard.css";
import {useEffect, useState} from "react";
import isImageValid from "@/Utils/Functions/ValidFunctions/isImageValid.ts";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";

interface ProductPhotoAddCardProps {
    id: string,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    myPreview?: string
}

export default function ProductPhotoAddCard({id, setFile, myPreview}: ProductPhotoAddCardProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [src, setSrc] = useState<string | null | undefined>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] || null;

        if (!f || !isImageValid(f)) {
            alert(getLanguage("myProfile.allowedFormats"));
            return;
        }

        setFile(f);

        if (f) {
            const url = URL.createObjectURL(f);
            setPreview(url);
        } else {
            setPreview(null);
        }
    };

    useEffect(() => {
        if (!myPreview && !preview) {
            setSrc(null);
            return;
        }
        if (!preview) {
            setSrc(myPreview);
        } else {
            setSrc(preview);
        }
    }, [myPreview, preview]);


    const clearFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setFile(null);
        setPreview(null);
    };

    return (
        <div className="uploadBox">
            <input
                id={id}
                type="file"
                className="uploadInput"
                accept="image/*"
                onChange={onChange}
            />

            <label htmlFor={id} className="uploadLabel">
                {preview || myPreview? (
                    <>
                        <img src={src || "."} alt="preview"
                             className="uploadImage"/>
                        <button className="uploadCloseBtn" onClick={clearFile}>
                            <X className="uploadCloseIcon"/>
                        </button>
                    </>
                ) : (
                    <div className="uploadContent">
                        <UploadIcon/>
                        <span
                            className="uploadText"><PWithPlaypenSans>{getLanguage("addProduct.addText")}</PWithPlaypenSans></span>
                    </div>
                )}
            </label>
        </div>
    );
}
