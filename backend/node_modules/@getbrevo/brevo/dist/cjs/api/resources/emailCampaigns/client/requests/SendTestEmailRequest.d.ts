import type * as Brevo from "../../../../index.js";
/**
 * @example
 *     {
 *         campaignId: 1000000,
 *         body: {}
 *     }
 */
export interface SendTestEmailRequest {
    /** Id of the campaign */
    campaignId: number;
    body: Brevo.SendTestEmail;
}
