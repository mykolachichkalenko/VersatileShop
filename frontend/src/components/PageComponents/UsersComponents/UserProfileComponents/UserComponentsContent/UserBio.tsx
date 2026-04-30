import "./UserBio.css";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import type UserInfo from "@/Utils/Interfaces/UserInfo.ts";
import {Ban, Flag, MessageCircle, Star} from "lucide-react";
import AlertDialogBlockUser
    from "@/components/AdditionalComponents/FormComponents/AlertDialogs/AlertDialogBlockUser.tsx";
import {useState} from "react";
import CreateReport from "@/components/AdditionalComponents/FormComponents/ReportsContainers/CreateReport.tsx";

interface UserBioProps {
    userBio?: UserInfo;
    isUserProfileBlocked: boolean | null;
    isUserAuthenticated: boolean;
    setIsUserBLocked: React.Dispatch<React.SetStateAction<boolean | null>>;
    email: string;
    myEmail: string;
}

export default function UserBio({
                                    userBio,
                                    isUserAuthenticated,
                                    isUserProfileBlocked,
                                    setIsUserBLocked,
                                    email,
                                    myEmail
                                }: UserBioProps) {
    const [isOpenReportDialog, setIsOpenReportDialog] = useState(false);

    return (
        <div className={"userBioContent"}>
            <div className={"userBioAvatar"}>
                <Avatar className={"w-26 h-26"}>
                    <AvatarImage
                        src={isUserProfileBlocked ? "https://img.freepik.com/premium-vector/block-user-vector-icon_625445-200.jpg" : userBio?.userURL}
                        alt="@shadcn"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div
                    className={`absolute bottom-1 right-3 h-3 w-3 rounded-full ring-3 ring-white ${isUserProfileBlocked ? "bg-red-500" : (userBio?.userOnline ? "bg-green-500" : "bg-gray-500")}`}/>
            </div>


            <div className={"userBioRating"}>
                <Star size={20} className={"fill-yellow-400 text-yellow-500"}/>
                <p className={"font-semibold"}>{userBio?.userRating} ({userBio?.userReviewsCount})</p>
            </div>


            <div className={"userBioName"}>
                <p className={"font-bold text-2xl whitespace-nowrap"}>{userBio?.userName}</p>
            </div>


            <div className={"userBioButtonsGroup"}>

                {(isUserAuthenticated && myEmail !== email)
                    &&
                    <div onClick={() => window.location.href = `/chats/${email}`}
                        className={"group bg-white w-9 h-9 rounded-full flex items-center justify-center border-1 border-gray-300 cursor-pointer hover:bg-blue-700 transition-colors duration-200"}>
                        <MessageCircle size={18} className={"group-hover:text-white"}/>
                    </div>
                }
                <div onClick={() => window.location.href = `/users/reviews/${email}`}
                     className={"group bg-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-1 border-gray-300 hover:bg-yellow-400 transition-colors duration-200"}>
                    <Star size={18} className={"group-hover:text-white"}/>
                </div>

                {(isUserAuthenticated && myEmail !== email)
                    &&
                    <div
                        onClick={() => setIsOpenReportDialog(true)}
                        className={"group bg-white w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-1 border-gray-300 hover:bg-red-500 transition-colors duration-200"}>
                        <Flag size={18} className={"group-hover:text-white"}/>
                    </div>
                }

                {(isUserProfileBlocked !== null && isUserAuthenticated && myEmail !== email) &&
                    <AlertDialogBlockUser isUserBlocked={isUserProfileBlocked} setIsUserBLocked={setIsUserBLocked}
                                          email={email}>
                        <div
                            className={`group ${isUserProfileBlocked ? "bg-green-300 hover:bg-white" : "bg-white hover:bg-red-600"} w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border-1 border-gray-300 transition-colors duration-200`}>
                            <Ban size={18} className={`${!isUserProfileBlocked && "group-hover:text-white"}`}/>
                        </div>
                    </AlertDialogBlockUser>}
            </div>

            <CreateReport isOpen={isOpenReportDialog}
                          setIsOpen={setIsOpenReportDialog}
                          userEmail={email}
                          type={"user"}/>
        </div>
    );
}