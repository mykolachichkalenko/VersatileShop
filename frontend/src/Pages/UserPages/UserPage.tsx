import {useParams} from "react-router-dom";
import DefaultComponent from "@/components/AdditionalComponents/DefaultComponents/DefaultComponent.tsx";
import UserComponentsContainer
    from "@/components/PageComponents/UsersComponents/UserProfileComponents/UserComponentsContainer.tsx";

export default function UserPage() {
    const params = useParams();

    return (
        <DefaultComponent>
            <UserComponentsContainer email={params.email}/>
        </DefaultComponent>
    );
}