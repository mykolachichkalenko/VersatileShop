import type Product from "@/Utils/Interfaces/Product.ts";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import "./ProductCard.css";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
    return (
        <div className={"ProductCard"}>
            <div className={"ProductCardImgContainer"}>
                <img src={product.photoFirst} alt={product.title} loading="lazy" decoding="async"/>
            </div>

            <span
                className={product.condition === "new" ? "ProductCardConditionNew" : "ProductCardConditionUsed"}>
                {product.condition === "new" ? getLanguage("myProducts.conditionNew") : getLanguage("myProducts.conditionUsed")}
            </span>


            <p className={"ProductCardTitle"}>{product.title}</p>

            <p className={"ProductCardPrice"}>{product.price}₴</p>

        </div>
    );
}