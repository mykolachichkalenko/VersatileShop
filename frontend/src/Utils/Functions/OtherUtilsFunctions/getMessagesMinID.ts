import type Message from "@/Utils/Interfaces/Message.ts";

interface getMessagesMinIDProps {
    messages:Message[];
}
export default function getMessagesMinID({messages}:getMessagesMinIDProps){
    if(!messages || messages.length === 0) return 0;
    const minId = messages ? messages.reduce((min, p) => Math.min(min, p.id), Infinity) : Infinity;
    return Number.isFinite(minId) ? minId : 0;
}