import type Message from "@/Utils/Interfaces/Message.ts";

interface getTestMessagesResponse {
    page: number;
}
export default function getTestMessages({ page }: getTestMessagesResponse): Message[] {

    return [
        {
            id: 15+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `15`,
            type: "text",
            createdAt:[2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 14+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `14`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 13+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `13`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 12+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `12`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 11+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `11`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 10+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `10`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 9+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `9`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 8+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `8`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 7+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `7`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 6+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `6`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 5+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `5`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 4+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `4`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 3+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `3`,
            type: "text",
            createdAt:[2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 2+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 2,
            recipientId: 1,
            content: `2`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        },
        {
            id: 1+(page*15),
            temporaryId: `temp-15`,
            chatId: 1,
            senderId: 1,
            recipientId: 2,
            content: `1`,
            type: "text",
            createdAt: [2026, 0, 1, 0, 0, 0],
            isRead: true
        }
    ];
}