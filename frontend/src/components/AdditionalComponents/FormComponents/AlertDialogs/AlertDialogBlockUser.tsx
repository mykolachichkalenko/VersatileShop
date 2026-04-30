import {
    AlertDialog, AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {useState} from "react";
import blockUserByEmail from "@/Utils/Functions/UserFuntions/blockUserByEmail.ts";
import unBlockUserByEmail from "@/Utils/Functions/UserFuntions/unBlockUserByEmail.ts";

interface AlertDialogBlockUserProps {
    children: React.ReactNode;
    isUserBlocked: boolean;
    setIsUserBLocked: React.Dispatch<React.SetStateAction<boolean | null>>;
    email: string;
}

export default function AlertDialogBlockUser({
                                                 children,
                                                 isUserBlocked,
                                                 setIsUserBLocked,
                                                 email
                                             }: AlertDialogBlockUserProps) {
    const [isInProcess, setIsInProcess] = useState(false);

    const agreeButtonHandler = async () => {
        if (isInProcess) return;

        if (isUserBlocked) {
            setIsInProcess(true);

            const res = await unBlockUserByEmail({email});
            if (res) setIsUserBLocked(false);

            setIsInProcess(false);
        } else {
            setIsInProcess(true);

            const res = await blockUserByEmail({email});
            if (res) setIsUserBLocked(true);

            setIsInProcess(false);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{getLanguage(`userPage.${isUserBlocked ? "unBlockUserTitle" : "blockUserTitle"}`)}</AlertDialogTitle>
                    <AlertDialogDescription/>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={"cursor-pointer"}>{getLanguage("userPage.cancelButton")}</AlertDialogCancel>
                    <AlertDialogAction className={`${isUserBlocked ? "bg-green-500" : "bg-red-500"} cursor-pointer`}
                        onClick={() => agreeButtonHandler()}>{getLanguage("userPage.agreeButton")}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}