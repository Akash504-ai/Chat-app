export type SendWhatsappMessageRequest = {
    contactNumbers: string[];
    params?: Record<string, unknown> | undefined;
    senderNumber: string;
    templateId: number;
} | {
    contactNumbers: string[];
    senderNumber: string;
    text: string;
};
