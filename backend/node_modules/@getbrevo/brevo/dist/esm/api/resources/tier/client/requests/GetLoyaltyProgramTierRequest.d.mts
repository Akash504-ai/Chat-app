import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         pid: "pid"
 *     }
 */
export interface GetLoyaltyProgramTierRequest {
    /** Loyalty Program ID */
    pid: string;
    /** Select 'active' to retrieve list of all tiers which are live for clients. Select draft to retrieve list of all non deleted tiers. */
    version?: Brevo.GetLoyaltyProgramTierRequestVersion;
}
