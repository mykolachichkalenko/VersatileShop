import DefaultComponent from "@/components/AdditionalComponents/DefaultComponents/DefaultComponent.tsx";
import {useSearchParams} from "react-router-dom";
import SearchPageContainer
    from "@/components/PageComponents/ProductPageComponents/SearchPageComponents/SearchPageContainer.tsx";

export default function SearchPage(){
    const [params] = useSearchParams();
    const q = params.get("q") ?? "";
    if(q.trim().length === 0){
        window.location.href="/";
    }

    return(
        <DefaultComponent>
           <SearchPageContainer searchText={q}/>
        </DefaultComponent>
    )
}