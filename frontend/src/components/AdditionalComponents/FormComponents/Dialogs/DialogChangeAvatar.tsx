import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {type ReactNode, useEffect, useState} from "react";
import ImageInput from "@/components/AdditionalComponents/SingleComponents/ImageInput.tsx";
import changeMyAvatar from "@/Utils/Functions/UserFuntions/changeMyAvatar.ts";

interface DialogChangeAvatarProps {
    trigger: ReactNode,
    avatarURL: string,
}

export default function DialogChangeAvatar({trigger, avatarURL}: DialogChangeAvatarProps) {
    const [file, setFile] = useState<File | null>(null);
    const [temporaryAvatarURL, setTemporaryAvatarURL] = useState<string>(avatarURL);

    const changeAvatar = async () => {
        // @ts-ignore
        const res = await changeMyAvatar(file);
        console.log(res);
        window.location.reload();
    }

    useEffect(() => {
        if (!file) {
            setTemporaryAvatarURL(avatarURL);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setTemporaryAvatarURL(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        {trigger}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] sm:max-h-[520px] z-[9999]">
                        <DialogHeader>
                            <DialogTitle>
                                <PWithPlaypenSans>
                                    {getLanguage("myProfile.changePhotoTitle")}
                                </PWithPlaypenSans>
                            </DialogTitle>
                        </DialogHeader>
                        <div className={"flex flex-col items-center justify-center space-y-4 my-4"}>
                            <img className={"w-[300px] h-[300px] object-cover rounded-4xl"} src={temporaryAvatarURL}
                                 alt={"URL"}/>
                            <ImageInput setFile={setFile}/>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline"
                                        onClick={() => setFile(null)}
                                        className={"cursor-pointer"}>
                                    <PWithPlaypenSans>{getLanguage("myProfile.cancelButton")}</PWithPlaypenSans>
                                </Button>
                            </DialogClose>

                            <Button type="submit"
                                    disabled={!file}
                                    variant="default"
                                    className="bg-blue-500 hover:bg-blue-400 text-white cursor-pointer"
                                    onClick={changeAvatar}>
                              <PWithPlaypenSans>  {getLanguage("myProfile.saveButton")}</PWithPlaypenSans>
                              </Button>
                        </DialogFooter>

                    </DialogContent>
                </form>
            </Dialog>
    );
}
