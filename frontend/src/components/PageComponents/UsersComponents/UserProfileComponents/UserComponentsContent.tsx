import UserBio
    from "@/components/PageComponents/UsersComponents/UserProfileComponents/UserComponentsContent/UserBio.tsx";
import UserProducts
    from "@/components/PageComponents/UsersComponents/UserProfileComponents/UserComponentsContent/UserProducts.tsx";
import type UserInfo from "@/Utils/Interfaces/UserInfo.ts";
import type Product from "@/Utils/Interfaces/Product.ts";
import React, {useEffect, useState} from "react";
import isAuthorized from "@/Utils/Functions/UserFuntions/isAuthorized.ts";
import getIsUserBlocked from "@/Utils/Functions/UserFuntions/getIsUserBlocked.ts";
import getMyEmail from "@/Utils/Functions/UserFuntions/getMyEmail.ts";

interface UserComponentsContentProps {
    userBio?: UserInfo;
    products?: Product[];
    setPage: React.Dispatch<React.SetStateAction<number>>;
    productsCount?: number;
    email: string;
}

export default function UserComponentsContent({
                                                  userBio,
                                                  products,
                                                  setPage,
                                                  productsCount,
                                                  email
                                              }: UserComponentsContentProps) {
    const [isUserProfileBlocked, setIsUserProfileBlocked] = useState<boolean | null>(null);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
    const [myEmail, setMyEmail] = useState<string>("");

    useEffect(() => {
        (async () => {
            const isAuthenticated = await isAuthorized();
            setIsUserAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const isBlocked = await getIsUserBlocked({email});
                setIsUserProfileBlocked(isBlocked);

                const data = await getMyEmail();
                setMyEmail(data);
            }
        })();
    }, []);

    return (
        <div>
            <UserBio userBio={userBio} isUserProfileBlocked={isUserProfileBlocked}
                     isUserAuthenticated={isUserAuthenticated} setIsUserBLocked={setIsUserProfileBlocked}
                     email={email} myEmail={myEmail}/>
            <UserProducts productsCount={productsCount} products={products} setPage={setPage}/>
        </div>
    );
}