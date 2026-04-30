import {useEffect, useState} from "react";
import {getMyProfile} from "@/Utils/Functions/UserFuntions/getMyProfile.ts";
import type UserProfile from "@/Utils/Interfaces/UserProfile.ts";
import MyProfileLeaveAndLanguage
    from "@/components/PageComponents/UsersComponents/MyProfileComponents/MyProfileLeaveAndLanguage.tsx";
import "./MyProfileContainer.css";
import MyProfileInfo from "@/components/PageComponents/UsersComponents/MyProfileComponents/MyProfileInfo.tsx";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import MyProfileAbout from "@/components/PageComponents/UsersComponents/MyProfileComponents/MyProfileAbout.tsx";
import getProductsCount from "@/Utils/Functions/ProductFunctions/getProductsCount.ts";
import getFavoritesCount from "@/Utils/Functions/ProductFunctions/getFavoritesCount.ts";

export default function MyProfileContainer() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [productsCount, setProductsCount] = useState<number>(0);
    const [favoritesCount, setFavoritesCount] = useState<number>(0);

    const setName = (name: string) => {
        setUser(prev => prev ? {...prev, name: name} : prev);
    }
    const setCity = (city: string) => {
        setUser(prev => prev ? {...prev, city: city} : prev);
    }
    const setDepartment = (department: string) => {
        setUser(prev => prev ? {...prev, department: department} : prev);
    }

    const fetchMyProfile = async () => {
        setUser(await getMyProfile());
        setProductsCount(await getProductsCount());
        setFavoritesCount(await getFavoritesCount());
    }

    useEffect(() => {
        fetchMyProfile();
    }, []);


    return (
        <>
            {user ?
                <div className={"MyProfileContainerWrapper"}>
                    <div className={"MyProfileContainer"}>
                        <MyProfileLeaveAndLanguage/>
                        <MyProfileInfo name={user?.name} avatarUrl={user?.avatarUrl} email={user?.email}
                                       setName={setName}/>
                        <MyProfileAbout productsCount={String(productsCount)} favoritesCount={String(favoritesCount)}
                                        department={user?.department} city={user?.city} setCity={setCity}
                                        setDepartment={setDepartment} email={user.email}/>
                    </div>
                </div>
                :
                <div className={"w-full h-[90vh] flex items-center justify-center"}>
                    <PageLoader/>
                </div>
            }
        </>
    )
}
