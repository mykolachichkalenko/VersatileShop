import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import api from "@/Configs/Api.tsx";

interface AlertDialogLogOutProps {
    trigger: React.ReactNode,
}

export default function AlertDialogLogOut({trigger}: AlertDialogLogOutProps) {

    const logout = async () => {
         api.post("/api/security/logout");
        window.location.href="/";
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>

                <AlertDialogHeader>
                    <AlertDialogTitle>
                        <PWithPlaypenSans>{getLanguage("myProfile.logoutTitle")}</PWithPlaypenSans>
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className={"cursor-pointer"}>
                        <PWithPlaypenSans>{getLanguage("myProfile.cancelButton")}</PWithPlaypenSans>
                    </AlertDialogCancel>

                    <AlertDialogAction className="bg-blue-500 hover:bg-blue-400 text-white cursor-pointer" onClick={logout}>
                        <PWithPlaypenSans>{getLanguage("myProfile.agreeButton")}</PWithPlaypenSans>
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>

    );

}