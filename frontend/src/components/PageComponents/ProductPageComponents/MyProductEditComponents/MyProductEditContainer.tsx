import MyProductEditHeader
    from "@/components/PageComponents/ProductPageComponents/MyProductEditComponents/MyProductEditHeader.tsx";
import "./MyProductEdit.css";
import EditProductPhotos
    from "@/components/PageComponents/ProductPageComponents/MyProductEditComponents/ProductEditContent/EditProductPhotos.tsx";
import {useEffect, useMemo, useState} from "react";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import {useParams} from "react-router-dom";
import type Product from "@/Utils/Interfaces/Product.ts";
import EditProductTitle
    from "@/components/PageComponents/ProductPageComponents/MyProductEditComponents/ProductEditContent/EditProductTitle.tsx";
import EditProductDescription
    from "@/components/PageComponents/ProductPageComponents/MyProductEditComponents/ProductEditContent/EditProductDescription.tsx";
import EditProductPrice
    from "@/components/PageComponents/ProductPageComponents/MyProductEditComponents/ProductEditContent/EditProductPrice.tsx";
import EditProductCondition
    from "@/components/PageComponents/ProductPageComponents/MyProductEditComponents/ProductEditContent/EditProductCondition.tsx";
import EditProductButton
    from "@/components/PageComponents/ProductPageComponents/MyProductEditComponents/ProductEditContent/EditProductButton.tsx";
import type EditProductRequest from "@/Utils/Interfaces/EditProductRequest.ts";
import editProduct from "@/Utils/Functions/ProductFunctions/editProduct.ts";
import getProductForEdit from "@/Utils/Functions/ProductFunctions/getProductForEdit.ts";

export default function MyProductEditContainer() {
    const params = useParams();
    const productId = useMemo(() => {
        const rawId = params.id;
        const n = rawId ? Number(rawId) : 0;
        return Number.isInteger(n) && n > 0 ? n : 0;
    }, [params.id]);

    const [oldProduct, setOldProduct] = useState<Product | null>(null);

    const [newFirstFile, setNewFirstFile] = useState<File | null>(null);
    const [newSecondFile, setNewSecondFile] = useState<File | null>(null);
    const [newThirdFile, setNewThirdFile] = useState<File | null>(null);
    const [newTitle, setNewTitle] = useState<string | null>(null);
    const [newDescription, setNewDescription] = useState<string | null>(null);
    const [newPrice, setNewPrice] = useState<string | null>("");
    const [newCondition, setNewCondition] = useState<string | undefined | null>(null);

    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {

        if (productId === 0) {
            setOldProduct(null);
            return;
        }

        (async () => {
            const product = await getProductForEdit({id: productId});
            setOldProduct(product);
        })();
    }, [productId]);

    useEffect(() => {
        if (!newFirstFile && !newSecondFile && !newThirdFile && !newTitle && !newDescription && !newPrice && !newCondition) {
            setIsCorrect(false);
            return;
        }
        const titleNotCorrect = newTitle && newTitle.length === 0 || newTitle && newTitle.length > 90;
        const descriptionNotCorrect = newDescription && newDescription.length === 0 || newDescription && newDescription.length > 2000 || newDescription && newDescription.length < 20;
        const priceIsNotCorrect = Number.parseFloat(newPrice as string) < 1 || Number.parseFloat(newPrice as string) > 10000000 || newPrice && newPrice?.trim().length > 10;

        if (titleNotCorrect || descriptionNotCorrect || priceIsNotCorrect) {
            setIsCorrect(false)
        } else {
            setIsCorrect(true);
        }
    }, [newFirstFile, newSecondFile, newThirdFile, newTitle, newDescription, newPrice, newCondition]);

    useEffect(() => {
        if (isEdit) {
            const secondPhoto = newSecondFile ? newSecondFile
                : (newThirdFile ?
                    (oldProduct?.photoSecond ? newSecondFile : newThirdFile)
                    : newSecondFile);

            const thirdPhoto = newThirdFile ?
                (newSecondFile ? newThirdFile
                    : oldProduct?.photoSecond ? newThirdFile : null)
                : newThirdFile;

            const newEditedProduct: EditProductRequest = {
                id: oldProduct?.id,
                title: newTitle,
                description: newDescription,
                price: Number.parseFloat(String(newPrice)),
                condition: newCondition,
                photoFirst: newFirstFile,
                photoSecond: secondPhoto,
                photoThird: thirdPhoto
            };

            (async () => {
                await editProduct({editedProduct: newEditedProduct});
            })();
            setOldProduct(null);
        }
    }, [isEdit]);

    return (
        <div className={"editProduct"}>
            <MyProductEditHeader/>

            {oldProduct ?
                <div className={"addProductContentContainer"}>
                    <EditProductPhotos setNewFirstFile={setNewFirstFile} setNewSecondFile={setNewSecondFile}
                                       setNewThirdFile={setNewThirdFile} oldProduct={oldProduct}/>
                    <EditProductTitle setTitle={setNewTitle} newTitle={newTitle} oldTitle={oldProduct.title}/>
                    <EditProductDescription setDescription={setNewDescription} newDescription={newDescription}
                                            oldDescription={oldProduct?.description}/>
                    <EditProductPrice setPrice={setNewPrice} newPrice={newPrice} oldPrice={String(oldProduct.price)}/>
                    <EditProductCondition setCondition={setNewCondition} oldCondition={oldProduct.condition}
                                          newCondition={newCondition}/>
                    <EditProductButton isCorrect={isCorrect} setEdit={setIsEdit}/>
                </div>
                :
                <div className={"absolute top-[40%]"}>
                    <PageLoader/>
                </div>
            }
        </div>
    )
}