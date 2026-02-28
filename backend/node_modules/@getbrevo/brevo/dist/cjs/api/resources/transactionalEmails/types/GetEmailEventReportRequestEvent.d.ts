export declare const GetEmailEventReportRequestEvent: {
    readonly Bounces: "bounces";
    readonly HardBounces: "hardBounces";
    readonly SoftBounces: "softBounces";
    readonly Delivered: "delivered";
    readonly Spam: "spam";
    readonly Requests: "requests";
    readonly Opened: "opened";
    readonly Clicks: "clicks";
    readonly Invalid: "invalid";
    readonly Deferred: "deferred";
    readonly Blocked: "blocked";
    readonly Unsubscribed: "unsubscribed";
    readonly Error: "error";
    readonly LoadedByProxy: "loadedByProxy";
};
export type GetEmailEventReportRequestEvent = (typeof GetEmailEventReportRequestEvent)[keyof typeof GetEmailEventReportRequestEvent];
