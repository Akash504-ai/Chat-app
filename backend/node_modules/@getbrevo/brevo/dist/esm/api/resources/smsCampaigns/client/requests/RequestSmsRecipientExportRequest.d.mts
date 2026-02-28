/**
 * @example
 *     {
 *         campaignId: 1000000,
 *         recipientsType: "all"
 *     }
 */
export interface RequestSmsRecipientExportRequest {
    /** id of the campaign */
    campaignId: number;
    /** URL that will be called once the export process is finished. For reference, https://help.brevo.com/hc/en-us/articles/360007666479 */
    notifyURL?: string;
    /** Filter the recipients based on how they interacted with the campaign */
    recipientsType: RequestSmsRecipientExportRequest.RecipientsType;
}
export declare namespace RequestSmsRecipientExportRequest {
    /** Filter the recipients based on how they interacted with the campaign */
    const RecipientsType: {
        readonly All: "all";
        readonly Delivered: "delivered";
        readonly Answered: "answered";
        readonly SoftBounces: "softBounces";
        readonly HardBounces: "hardBounces";
        readonly Unsubscribed: "unsubscribed";
    };
    type RecipientsType = (typeof RecipientsType)[keyof typeof RecipientsType];
}
