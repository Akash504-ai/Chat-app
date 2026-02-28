export declare const GetSmsCampaignsRequestStatus: {
    readonly Suspended: "suspended";
    readonly Archive: "archive";
    readonly Sent: "sent";
    readonly Queued: "queued";
    readonly Draft: "draft";
    readonly InProcess: "inProcess";
};
export type GetSmsCampaignsRequestStatus = (typeof GetSmsCampaignsRequestStatus)[keyof typeof GetSmsCampaignsRequestStatus];
