import type Product from "@/Utils/Interfaces/Product.ts";
import "./MyProductCard.css";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Trash2} from "lucide-react";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import AlertDialogDeleteProduct
    from "@/components/AdditionalComponents/FormComponents/AlertDialogs/AlertDialogDeleteProduct.tsx";
import React from "react";

interface MyProductItemProps {
    product: Product,
    setProducts:React.Dispatch<React.SetStateAction<Product[] | null>>,
    setProductsDeleted:React.Dispatch<React.SetStateAction<number>>
}

export default function MyProductCard({product,setProducts,setProductsDeleted}: MyProductItemProps) {

    return (
        <div className={"myProductCard"}>
            <div className={"myProductCardImgContainer"}>
                <img src={product.photoFirst} alt={product.title} loading="lazy" decoding="async"/>
            </div>

            <span
                className={product.condition === "new" ? "myProductCardConditionNew" : "myProductCardConditionUsed"}>
                {product.condition === "new" ? getLanguage("myProducts.conditionNew") : getLanguage("myProducts.conditionUsed")}
            </span>


            <p className={"myProductCardTitle"}>{product.title}</p>

            <p className={"myProductCardPrice"}>{product.price}₴</p>

            <div className={"myProfileCardBTNContainer"}>
                <Button className={"myProfileCardButtonEdit"} onClick={() => window.location.href=`/my-products/edit/${product.id}`}><Pencil/></Button>
                <AlertDialogDeleteProduct trigger={<Button className={"myProfileCardButtonDelete"}><Trash2/></Button>}
                                          id={product.id} setProducts={setProducts} setProductsDeleted={setProductsDeleted}/>
            </div>
        </div>
    );
}