import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {DialogTrigger} from "@radix-ui/react-dialog";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useEffect, useState} from "react";
import changeMyName from "@/Utils/Functions/UserFuntions/changeMyName.ts";

interface DialogChangeNameProps {
    trigger: React.ReactNode,
    name: string,
    setName: (name: string) => void,
}

export default function DialogChangeName({trigger, name,setName}: DialogChangeNameProps) {
    const [newName, setNewName] = useState<string>(name);
    const [canSave, setCanSave] = useState<boolean>(false);

    const saveName = async () => {
        setName(newName.trim());
        console.log(newName.trim());
        await changeMyName(newName.trim());
    }

    useEffect(() => {
        if(!newName || newName.trim().length > 40 || newName.trim().length === 0 ||newName.trim() === name.trim()){
            setCanSave(false);
        }else {
            setCanSave(true);
        }
    }, [newName]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <PWithPlaypenSans>{getLanguage("myProfile.changeNameTitle")}</PWithPlaypenSans>
                    </DialogTitle>
                </DialogHeader>

                <Input type={"text"} value={newName} onChange={(e) => setNewName(e.target.value)}/>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline"
                                className={"cursor-pointer"}>
                            <PWithPlaypenSans>{getLanguage("myProfile.cancelButton")}</PWithPlaypenSans>
                        </Button>
                    </DialogClose>
                    <Button type="submit"
                            variant="default"
                            disabled={!canSave}
                            onClick={saveName}
                            className="bg-blue-500 hover:bg-blue-400 text-white cursor-pointer">
                        <PWithPlaypenSans>{getLanguage("myProfile.saveButton")}</PWithPlaypenSans>
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
