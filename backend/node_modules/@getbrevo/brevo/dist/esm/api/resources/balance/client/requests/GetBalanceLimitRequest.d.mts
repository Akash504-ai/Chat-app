import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         pid: "pid",
 *         bdid: "bdid",
 *         blid: "blid"
 *     }
 */
export interface GetBalanceLimitRequest {
    /** Loyalty Program Id */
    pid: string;
    /** Balance Definition Id */
    bdid: string;
    /** Balance Limit Id */
    blid: string;
    /** Version */
    version?: Brevo.GetBalanceLimitRequestVersion;
}
