export declare const GetSmsEventsRequestEvent: {
    readonly Bounces: "bounces";
    readonly HardBounces: "hardBounces";
    readonly SoftBounces: "softBounces";
    readonly Delivered: "delivered";
    readonly Sent: "sent";
    readonly Accepted: "accepted";
    readonly Unsubscription: "unsubscription";
    readonly Replies: "replies";
    readonly Blocked: "blocked";
    readonly Rejected: "rejected";
    readonly Skipped: "skipped";
};
export type GetSmsEventsRequestEvent = (typeof GetSmsEventsRequestEvent)[keyof typeof GetSmsEventsRequestEvent];
