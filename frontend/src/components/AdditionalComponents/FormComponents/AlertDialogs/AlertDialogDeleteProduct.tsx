import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import React from "react";
import type Product from "@/Utils/Interfaces/Product.ts";
import deleteProductByID from "@/Utils/Functions/ProductFunctions/deleteProductByID.ts";

interface AlertDialogDeleteProductProps {
    trigger: React.ReactNode,
    id: number,
    setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>,
    setProductsDeleted:React.Dispatch<React.SetStateAction<number>>

}

export default function AlertDialogDeleteProduct({trigger, id, setProducts,setProductsDeleted}: AlertDialogDeleteProductProps) {


    const onDelete = async () => {
        setProductsDeleted(prev => prev+1);
        // @ts-ignore
        setProducts(prev => prev.filter(p => p.id !== id));
        await deleteProductByID({id});
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>

                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <PWithPlaypenSans>{getLanguage("myProducts.deleteProductTitle")}</PWithPlaypenSans>
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className={"cursor-pointer"}>
                        <PWithPlaypenSans>{getLanguage("myProfile.cancelButton")}</PWithPlaypenSans>
                    </AlertDialogCancel>

                    <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white cursor-pointer" onClick={onDelete}>
                        <PWithPlaypenSans>{getLanguage("myProfile.agreeButton")}</PWithPlaypenSans>
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
}