import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {ButtonGroup, ButtonGroupSeparator} from "@/components/ui/button-group.tsx";
import PWithPlaypenSans from "@/components/AdditionalComponents/SingleComponents/PWithPlaypenSans.tsx";
import {useEffect, useState} from "react";
import {changeLanguage} from "@/Utils/LanguageUtils/changeLanguage.ts";
import AlertDialogLogOut from "@/components/AdditionalComponents/FormComponents/AlertDialogs/AlertDialogLogOut.tsx";

export default function MyProfileLeaveAndLanguage() {
    const [language, setLanguage] = useState("");

    useEffect(() => {
        const lang = localStorage.getItem('lang');
        setLanguage(lang === 'ua' || lang === 'en' || lang === 'ru' ? lang : 'ua');
    }, []);

    return (
        <div className={"myProfileLeaveContainer"}>
            <ButtonGroup className={"myProfileLanguageContainer"}>
                <Button variant="ghost" className={"hover:bg-transparent cursor-pointer"}
                onClick={() =>changeLanguage("en")}>
                    <PWithPlaypenSans
                    className={language === 'en' ? "myProfileLanguagePSelected" : "myProfileLanguageP"}
                    children={"en"}/>
                </Button>

                <ButtonGroupSeparator style={{height: "37px", color: "black"}}/>
                <ButtonGroupSeparator style={{height: "37px", color: "black"}}/>

                <Button variant="ghost" className={"hover:bg-transparent cursor-pointer"}
                onClick={() =>changeLanguage("ru")}>
                    <PWithPlaypenSans
                    className={language === 'ru' ? "myProfileLanguagePSelected" : "myProfileLanguageP"}
                    children={"ru"}/>
                </Button>

                <ButtonGroupSeparator style={{height: "37px", color: "black"}}/>
                <ButtonGroupSeparator style={{height: "37px", color: "black"}}/>

                <Button variant="ghost" className={"hover:bg-transparent cursor-pointer"}
                onClick={() =>changeLanguage("ua")}>
                    <PWithPlaypenSans
                    className={language === 'ua' ? "myProfileLanguagePSelected" : "myProfileLanguageP"}
                    children={"ua"}/>
                </Button>

            </ButtonGroup>

            <div className={"myProfileLeaveBTNContainer"}>
                <AlertDialogLogOut trigger={<Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive cursor-pointer hover:bg-destructive/10"
                >
                <LogOut className="w-5 h-5"/>
                </Button>}/>

            </div>
        </div>
    )
}