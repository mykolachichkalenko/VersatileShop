import DefaultComponent from "@/components/AdditionalComponents/DefaultComponents/DefaultComponent.tsx";
import MyProductEditContainer
    from "@/components/PageComponents/ProductPageComponents/MyProductEditComponents/MyProductEditContainer.tsx";

export default function EditProductPage() {

    return(
      <DefaultComponent>
          <MyProductEditContainer/>
      </DefaultComponent>
    );
}