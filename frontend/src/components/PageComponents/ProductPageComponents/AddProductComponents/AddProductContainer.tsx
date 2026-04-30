import AddProductHeader
    from "@/components/PageComponents/ProductPageComponents/AddProductComponents/AddProductHeader.tsx";
import "./AddProdcutContainer.css";
import AddProductPhotos
    from "@/components/PageComponents/ProductPageComponents/AddProductComponents/AddProductContent/AddProductPhotos.tsx";
import {useEffect, useState} from "react";
import AddProductTitle
    from "@/components/PageComponents/ProductPageComponents/AddProductComponents/AddProductContent/AddProductTitle.tsx";
import AddProductDescription
    from "@/components/PageComponents/ProductPageComponents/AddProductComponents/AddProductContent/AddProductDescription.tsx";
import AddProductPrice
    from "@/components/PageComponents/ProductPageComponents/AddProductComponents/AddProductContent/AddProductPrice.tsx";
import AddProductCondition
    from "@/components/PageComponents/ProductPageComponents/AddProductComponents/AddProductContent/AddProductCondition.tsx";
import AddProductAddButton
    from "@/components/PageComponents/ProductPageComponents/AddProductComponents/AddProductContent/AddProductAddButton.tsx";
import TextType from "@/components/AdditionalComponents/SingleComponents/TextTypeEffect.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";

export default function AddProductContainer() {
    const [firstFile, setFirstFile] = useState<File | null>(null);
    const [secondFile, setSecondFile] = useState<File | null>(null);
    const [thirdFile, setThirdFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string | null>("");
    const [description, setDescription] = useState<string | null>("");
    const [price, setPrice] = useState<string | null>("");
    const [condition, setCondition] = useState<string | undefined>();

    const [isCorrect, setIsCorrect] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (firstFile && title && description && price && condition
            && title.length > 0 && title.length < 91
            && description.length > 19 && description.length < 2001
            && Number.parseFloat(price) > 0 && Number.parseFloat(price) < 10000000 && price.length > 0
            && condition !== "") {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }, [firstFile, title, description, price, condition]);

    useEffect(() => {
        if (isAdding) {
            setTitle("");
            setDescription("");
            setPrice("");
            setCondition("");
            setFirstFile(null);
            setThirdFile(null);
            setSecondFile(null);
        }
    }, [isAdding]);

    return (
        <div className={"addProductContainer"}>
            <AddProductHeader/>

            {
                isAdding ?
                    <div className={"absolute flex w-[100%] h-[90%] justify-center items-center"}>
                        <TextType
                            text={[getLanguage("addProduct.productAddingText")]}
                            typingSpeed={75}
                            pauseDuration={3000}
                            showCursor={true}
                            cursorCharacter="|"
                            textColors={["rgba(67,89,75,0.6)"]}
                        />
                    </div>
                    :
                    <div className={"addProductContentContainer"}>
                        <AddProductPhotos setFirstFile={setFirstFile} setSecondFile={setSecondFile}
                                          setThirdFile={setThirdFile}/>

                        <AddProductTitle setTitle={setTitle}/>

                        <AddProductDescription setDescription={setDescription}/>

                        <AddProductPrice setPrice={setPrice}/>

                        <AddProductCondition setCondition={setCondition}/>

                        <AddProductAddButton isCorrect={isCorrect} setIsCorrect={setIsCorrect}
                                             setIsAdding={setIsAdding} product={
                            {
                                title: title ? title : "",
                                description: description ? description : "",
                                price: price ? Number.parseFloat(price) : 0,
                                condition: condition ? condition : "",
                                photoFirst: firstFile ? firstFile : new File([""], "empty.png", {type: "image/png"}),
                                photoSecond: secondFile ? secondFile : undefined,
                                photoThird: thirdFile ? thirdFile : undefined
                            }
                        }/>
                    </div>}

        </div>
    );
}