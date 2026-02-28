export declare const GetWhatsappEventReportRequestEvent: {
    readonly Sent: "sent";
    readonly Delivered: "delivered";
    readonly Read: "read";
    readonly Error: "error";
    readonly Unsubscribe: "unsubscribe";
    readonly Reply: "reply";
    readonly SoftBounce: "soft-bounce";
};
export type GetWhatsappEventReportRequestEvent = (typeof GetWhatsappEventReportRequestEvent)[keyof typeof GetWhatsappEventReportRequestEvent];
