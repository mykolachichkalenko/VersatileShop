import {
    DialogTrigger,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogClose
} from "@/components/ui/dialog.tsx";
import {type ReactNode, useEffect, useState} from "react";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import changeMyDepartment from "@/Utils/Functions/UserFuntions/changeMyDepartment.ts";

interface DialogChangeDepartmentProps {
    trigger: ReactNode,
    department: string,
    city: string,
    setDepartment: (department: string) => void,
    setCity: (city: string) => void,
}

export default function DialogChangeDepartment({
                                                   trigger,
                                                   department,
                                                   city,
                                                   setDepartment,
                                                   setCity
                                               }: DialogChangeDepartmentProps) {
    const [newCity, setNewCity] = useState<string>(city);
    const [newDepartment, setNewDepartment] = useState(department);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        if (!newCity || !newDepartment || newCity.trim() === "" || newDepartment.trim() === "" || newCity.trim().length == 0 || newDepartment.trim().length == 0 || newCity.trim().length > 30 || newDepartment.trim().length > 50) {
            setIsCorrect(false);
        } else {
            setIsCorrect(true);
        }
    }, [newCity, newDepartment]);

    const saveDepartment = async () => {
        setCity(newCity.trim());
        setDepartment(newDepartment.trim());
        await changeMyDepartment(newDepartment, newCity);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <PWithPlaypenSans>
                            {getLanguage("myProfile.changeDepartment")}
                        </PWithPlaypenSans>
                    </DialogTitle>
                </DialogHeader>

                <Label htmlFor="city"><PWithPlaypenSans>{getLanguage("myProfile.city")}</PWithPlaypenSans></Label>
                <Input id={"city"} value={newCity} onChange={(e) => setNewCity(e.target.value)}/>

                <Label htmlFor="department"
                       className={"mt-4"}><PWithPlaypenSans>{getLanguage("myProfile.myDepartment")}</PWithPlaypenSans></Label>
                <Input id={"department"} value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)}/>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline"
                                className={"cursor-pointer"}>
                            <PWithPlaypenSans>{getLanguage("myProfile.cancelButton")}</PWithPlaypenSans>
                        </Button>
                    </DialogClose>
                    <Button type="submit"
                            variant="default"
                            disabled={!isCorrect}
                            onClick={saveDepartment}
                            className="bg-blue-500 hover:bg-blue-400 text-white cursor-pointer">
                        <PWithPlaypenSans>{getLanguage("myProfile.saveButton")}</PWithPlaypenSans>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}