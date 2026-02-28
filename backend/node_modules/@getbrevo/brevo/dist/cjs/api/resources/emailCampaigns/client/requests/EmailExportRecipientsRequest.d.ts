/**
 * @example
 *     {
 *         campaignId: 1000000,
 *         recipientsType: "all"
 *     }
 */
export interface EmailExportRecipientsRequest {
    /** Id of the campaign */
    campaignId: number;
    /** Webhook called once the export process is finished. For reference, https://help.brevo.com/hc/en-us/articles/360007666479 */
    notifyURL?: string;
    /** Type of recipients to export for a campaign */
    recipientsType: EmailExportRecipientsRequest.RecipientsType;
}
export declare namespace EmailExportRecipientsRequest {
    /** Type of recipients to export for a campaign */
    const RecipientsType: {
        readonly All: "all";
        readonly NonClickers: "nonClickers";
        readonly NonOpeners: "nonOpeners";
        readonly Clickers: "clickers";
        readonly Openers: "openers";
        readonly SoftBounces: "softBounces";
        readonly HardBounces: "hardBounces";
        readonly Unsubscribed: "unsubscribed";
    };
    type RecipientsType = (typeof RecipientsType)[keyof typeof RecipientsType];
}
