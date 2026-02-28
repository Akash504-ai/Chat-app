import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         campaignId: 1000000,
 *         body: {}
 *     }
 */
export interface UpdateCampaignStatusRequest {
    /** Id of the campaign */
    campaignId: number;
    body: Brevo.UpdateCampaignStatus;
}
