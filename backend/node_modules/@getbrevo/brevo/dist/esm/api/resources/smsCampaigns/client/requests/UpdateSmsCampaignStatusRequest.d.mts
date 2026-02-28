import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         campaignId: 1000000,
 *         body: {}
 *     }
 */
export interface UpdateSmsCampaignStatusRequest {
    /** id of the campaign */
    campaignId: number;
    body: Brevo.UpdateCampaignStatus;
}
