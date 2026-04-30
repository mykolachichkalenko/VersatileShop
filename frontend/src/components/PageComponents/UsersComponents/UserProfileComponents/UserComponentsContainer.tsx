import {useEffect, useState} from "react";
import type UserInfo from "@/Utils/Interfaces/UserInfo.ts";
import DefaultHeader from "@/components/AdditionalComponents/FormComponents/OtherContainers/DefaultHeader.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import UserComponentsContent
    from "@/components/PageComponents/UsersComponents/UserProfileComponents/UserComponentsContent.tsx";
import "./UserComponentsContainer.css";
import getUserBioInfo from "@/Utils/Functions/UserFuntions/getUserBioInfo.ts";
import type Product from "@/Utils/Interfaces/Product.ts";
import getProductsByUserEmail from "@/Utils/Functions/UserFuntions/getProductsByUserEmail.ts";
import getMinID from "@/Utils/Functions/OtherUtilsFunctions/getMinID.ts";
import PageLoader from "@/components/AdditionalComponents/Loaders/PageLoader.tsx";
import getProductsCountByEmail from "@/Utils/Functions/ProductFunctions/getProductsCountByEmail.ts";

interface UserComponentsContainerProps {
    email?: string;
}

export default function UserComponentsContainer({email}: UserComponentsContainerProps) {
    const [userInfo, setUserInfo] = useState<UserInfo>();


    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(0);

    const [productsCount, setProductsCount] = useState(0);

    const [isLoaded, setIsLoaded] = useState(false);

    const setData = async () => {
        const userData = await getUserBioInfo({email});
        setUserInfo(userData);

        const products = await getProductsByUserEmail({email, minId: 0});
        setProducts(products || []);

        const productCount = await getProductsCountByEmail({email});
        setProductsCount(productCount);

        setIsLoaded(true);
    }
    useEffect(() => {
        if (email?.length === 0) return;
        setData();
    }, [email]);

    useEffect(() => {
        if (page === 0) return;
        (async () => {
            const minId = getMinID({products});
            const getNextProducts = await getProductsByUserEmail({email, minId: minId});
            setProducts(prev => [...prev, ...(getNextProducts || [])]);
        })();
    }, [page]);

    return (
        <div className={"flex flex-col items-center overflow-hidden"}>
            <div className={"w-[98vw] flex justify-center"}>
                <DefaultHeader>
                    <PWithPlaypenSans className={"font-semibold"}>
                        {getLanguage("userPage.header")}
                    </PWithPlaypenSans>
                </DefaultHeader>
            </div>

            {isLoaded ?
                <div className={"userComponentsContentContainer"}>
                    <UserComponentsContent userBio={userInfo} products={products} setPage={setPage}
                                           productsCount={productsCount} email={String(email)}/>
                </div>
                :
                <div className={"flex items-center justify-center h-[80vh]"}>
                    <PageLoader/>
                </div>
            }
        </div>
    )
}