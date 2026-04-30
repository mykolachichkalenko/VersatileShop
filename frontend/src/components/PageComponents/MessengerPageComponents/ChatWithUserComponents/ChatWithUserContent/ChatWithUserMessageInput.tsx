import "./ChatWithUserMessageInput.css"
import {Input} from "@/components/ui/input.tsx";
import {PaperclipIcon, SendHorizontal} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import isImageValid from "@/Utils/Functions/ValidFunctions/isImageValid.ts";
import {getLanguage} from "@/Utils/LanguageUtils/getLanguage.ts";
import type Message from "@/Utils/Interfaces/Message.ts";
import createImageAndReturnURL from "@/Utils/Functions/OtherUtilsFunctions/createImageAndReturnURL.ts";


interface chatWithUserMessageInputProps {
    socket: React.RefObject<WebSocket | null>;
    userId: number;
    userEmail: string;
    myId: number;
    myEmail: string;
    socketTypingRef: React.RefObject<WebSocket | null>;
}

export default function ChatWithUserMessageInput({
                                                     socket,
                                                     myId,
                                                     userId,
                                                     myEmail,
                                                     userEmail,
                                                     socketTypingRef
                                                 }: chatWithUserMessageInputProps) {
    const [messageText, setMessageText] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const changeMessage = (e: any) => {
        setMessageText(e.target.value);
        typingSend();
    }

    const handleSendMessage = () => {
        if (messageText.trim().length === 0 || socket.current === null || socket.current.readyState !== WebSocket.OPEN) return;

        const newMessage: Message = {
            id: 0,
            temporaryId: myEmail + "" + crypto.randomUUID(),
            chatId: 0,
            senderId: myId,
            recipientId: userId,
            content: messageText.trim(),
            type: "text",
            isRead: false,
            createdAt: [],
        }

        socket.current.send(JSON.stringify(newMessage));
        setMessageText("");
    }

    const handleSendImageMessage = async () => {
        if (isSending || !file || !isImageValid(file) || socket.current === null || socket.current.readyState !== WebSocket.OPEN) {
            setFile(null);
            setFilePreview("");
            return;
        }
        setFilePreview("");
        setIsSending(true)

        const formData = new FormData();
        formData.append("file", file);

        const imageURL = await createImageAndReturnURL({fd: formData});

        const newMessage: Message = {
            id: 0,
            temporaryId: myEmail + "" + crypto.randomUUID(),
            chatId: 0,
            senderId: myId,
            recipientId: userId,
            content: imageURL,
            type: "image",
            isRead: false,
            createdAt: [],
        }

        socket.current.send(JSON.stringify(newMessage));
        setFile(null);
    }

    const handlePickFile = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (isImageValid(file)) {
            setFile(file);
        } else {
            alert(getLanguage("myProfile.allowedFormats"));
        }

    };

    const typingSend = () => {
        if (socketTypingRef && socketTypingRef.current?.readyState === WebSocket.OPEN) {
            socketTypingRef.current.send(userEmail);
        }
    }

    useEffect(() => {
        if (!file) {
            setFilePreview(null);
            return;
        }

        const tempURL = URL.createObjectURL(file);
        setFilePreview(tempURL);

        return () => {
            URL.revokeObjectURL(tempURL);
        };
    }, [file]);


    return (
        <div className={"chatWithUserMessageInputContainer"}>
            {filePreview ? (
                <div className={"chatWithUserImagePreviewCard"}>
                    <button
                        type="button"
                        className={"chatWithUserImageRemoveButton"}
                        onClick={() => {
                            setFile(null);
                            setFilePreview(null);
                            if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                            }
                        }}
                    >
                        ×
                    </button>

                    <img
                        src={filePreview}
                        alt={"Preview"}
                        className={"chatWithUserPreviewImage"}
                    />

                    <div className={"flex justify-end mt-2"}>
                        <SendHorizontal className={"cursor-pointer"} onClick={() => handleSendImageMessage()}/>
                    </div>
                </div>
            ) : (
                <>
                    <div className={"chatWithUserMessageInputWrapper"}>
                        <div className={"chatWithUserMessageInput"}>
                            <Input
                                className={"chatWithUserTextInput"}
                                value={messageText}
                                onChange={e => changeMessage(e)}
                                placeholder={getLanguage("chatWithUserPage.typeMessage")}
                            />
                        </div>
                    </div>

                    <div className={"chatWithUserMessageMediaInput"}>
                        {messageText.trim().length === 0 ? (
                            <>
                                <PaperclipIcon
                                    className="chatAttachIcon cursor-pointer"
                                    onClick={handlePickFile}
                                />

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{display: "none"}}
                                    onChange={handleFileChange}
                                />
                            </>
                        ) : (
                            <SendHorizontal className={"chatSendIcon cursor-pointer"}
                                            onClick={() => handleSendMessage()}/>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
