export default interface Message {
    id: number;
    temporaryId: string;
    chatId: number;
    senderId: number;
    recipientId: number;
    content: string;
    type: string;
    isRead: boolean;
    createdAt: number[];
}