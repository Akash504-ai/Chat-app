import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         pid: "pid",
 *         rid: "rid"
 *     }
 */
export interface GetLoyaltyOfferProgramsPidRewardsRidRequest {
    /** Loyalty Program ID */
    pid: string;
    /** Reward ID */
    rid: string;
    /** Version */
    version?: Brevo.GetLoyaltyOfferProgramsPidRewardsRidRequestVersion;
}
