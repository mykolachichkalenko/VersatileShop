import DefaultComponent from "@/components/AdditionalComponents/DefaultComponents/DefaultComponent.tsx";
import MyProductsContainer
    from "@/components/PageComponents/ProductPageComponents/MyProductsComponents/MyProductsContainer.tsx";

export default function MyProducts(){
    return(
        <DefaultComponent>
            <MyProductsContainer/>
        </DefaultComponent>
    )
}