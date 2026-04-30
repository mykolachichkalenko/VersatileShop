import DefaultComponent from "@/components/AdditionalComponents/DefaultComponents/DefaultComponent.tsx";
import MainPageHeader from "@/components/PageComponents/ProductPageComponents/MainPageComponents/MainPageHeader.tsx";
import MainPageContainer
    from "@/components/PageComponents/ProductPageComponents/MainPageComponents/MainPageContainer.tsx";

export default function MainPage() {

    return (
        <DefaultComponent>
            <div className={"w-[100%] h-[100%] flex flex-col items-center"}>
                <MainPageHeader/>
                <MainPageContainer/>
            </div>
        </DefaultComponent>
    )
}

