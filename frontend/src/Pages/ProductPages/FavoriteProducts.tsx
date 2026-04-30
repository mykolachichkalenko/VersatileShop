import DefaultComponent from "@/components/AdditionalComponents/DefaultComponents/DefaultComponent.tsx";
import MyFavoriteProductsContainer
    from "@/components/PageComponents/ProductPageComponents/MyFavoriteProducts/MyFavoriteProductsContainer.tsx";

export default function FavoriteProducts(){
    return(
        <DefaultComponent>
            <MyFavoriteProductsContainer/>
        </DefaultComponent>
    )
}