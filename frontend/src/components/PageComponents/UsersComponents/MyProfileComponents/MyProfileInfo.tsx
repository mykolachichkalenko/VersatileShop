import {Avatar} from "@radix-ui/react-avatar";
import {Pencil} from "lucide-react";
import DialogChangeAvatar from "@/components/AdditionalComponents/FormComponents/Dialogs/DialogChangeAvatar.tsx";
import DialogChangeName from "@/components/AdditionalComponents/FormComponents/Dialogs/DialogChangeName.tsx";

interface MyProfileInfoProps {
    avatarUrl: string;
    name: string;
    email: string;
    setName: (name: string) => void;
}

export default function MyProfileInfo({avatarUrl, name, email,setName}: MyProfileInfoProps) {
    return (
        <div className="p-8 border-0 rounded-3xl flex flex-col items-center text-center space-y-4">
            <div className="relative">
                <Avatar className="w-30 h-30 bg-transparent overflow-hidden">
                    <img
                        loading={"lazy"}
                        src={avatarUrl}
                        alt="AVATAR"
                        className="w-30 h-30 object-cover  rounded-4xl"
                    />
                </Avatar>

                <DialogChangeAvatar avatarURL={avatarUrl}
                    trigger={
                    <button
                        type="button"
                        className="absolute -top-1 -right-1 flex items-center justify-center cursor-pointer w-7 h-7 rounded-full bg-white shadow-md border border-slate-200"
                    >
                        <Pencil className="w-3.5 h-3.5 text-slate-500"/>
                    </button>
                }/>
            </div>

            <div className="space-y-1 relative">
                <div className="flex items-center gap-2 justify-center">
                    <h2 className="text-2xl text-black font-bold break-all">
                        {name}
                    </h2>
                    <DialogChangeName name={name} setName={setName}
                        trigger={
                        <button
                            type="button"
                            className="flex absolute right-[-20px] items-center justify-center w-6 h-6 rounded-full bg-white/90 shadow border border-slate-200 cursor-pointer"
                        >
                            <Pencil className="w-3 h-3 text-slate-500"/>
                        </button>
                    }/>
                </div>

                <p className="text-muted-foreground">
                    {email}
                </p>
            </div>
        </div>

    )
}